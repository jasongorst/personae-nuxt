<template>
  <details
    class="dropdown dropdown-bottom dropdown-end"
    ref="userMenu"
  >
    <summary class="btn btn-ghost">
      <Icon
        v-if="isSignedIn"
        name="fa6-solid:circle-user"
      />

      <Icon
        v-else
        name="fa6-regular:circle-user"
      />
    </summary>

    <ul
      class="dropdown-content menu w-52 mt-3 p-2 shadow bg-primary rounded-box z-10 whitespace-nowrap"
    >
      <template v-if="isSignedIn">
        <li class="menu-title text-primary-content/55 whitespace-nowrap">
          {{ email }}
        </li>

        <li v-if="isAdmin">
          <NuxtLink
            to="/dashboard/account"
            @click="closeUserMenu"
          >
            Dashboard
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/user/change-password"
            class="whitespace-nowrap"
            @click="closeUserMenu"
          >
            Change Password
          </NuxtLink>
        </li>

        <li>
          <button
            type="button"
            class="whitespace-nowrap"
            @click="signOut"
          >
            <span
              v-if="signOutStatus === 'pending'"
              class="loading loading-spinner"><!--
         --></span>

            <span v-else>Sign Out</span>
          </button>
        </li>
      </template>

      <template v-else>
        <li>
          <NuxtLink
            to="/user/sign-in"
            class="whitespace-nowrap"
            @click="closeUserMenu"
          >
            Sign In
          </NuxtLink>
        </li>
      </template>

      <ClientOnly>
        <li>
          <ThemeChanger />
        </li>
      </ClientOnly>
    </ul>
  </details>
</template>

<script setup>
const userMenu = ref(null)

const alertStore = useAlertStore()
const sessionStore = useSessionStore()
const { email, isAdmin, isSignedIn } = storeToRefs(sessionStore)

const route = useRoute()

function closeUserMenu() {
  userMenu.value.open = false
}

const { execute: signOut, status: signOutStatus } = useApiCall(
  "http://localhost:3000/auth/logout",
  {
    manualFetch: true,
    method: "post",

    beforeCb: async () => {
      await sleep(2000)
    },

    successCb: async () => {
      alertStore.addMessage(
        "You have been signed out.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      sessionStore.clear()
    },

    apiErrorCb: async () => {
      alertStore.addMessage(
        "You couldn't be signed out. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    fetchErrorCb: async () => {
      alertStore.addMessage(
        "You couldn't be signed out. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)
</script>

<style scoped>

</style>
