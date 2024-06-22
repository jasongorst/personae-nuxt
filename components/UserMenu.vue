<template>
  <details
    class="dropdown dropdown-bottom dropdown-end"
    ref="userMenu"
  >
    <summary
      class="btn btn-ghost swap"
      :class="{ 'swap-active': isSignedIn }"
    >
      <Icon
        name="fa6-solid:circle-user"
        class="swap-on"
      />
      <Icon
        name="fa6-regular:circle-user"
        class="swap-off"
      />
    </summary>

    <ul
      class="dropdown-content menu w-52 mt-3 p-2 shadow bg-primary rounded-box z-10 whitespace-nowrap"
    >
      <template v-if="isSignedIn">
        <li class="menu-title text-primary-content/55 whitespace-nowrap">
          {{ sessionStore.email }}
        </li>

        <li v-if="sessionStore.isAdmin">
          <NuxtLink
            :to="{ name: 'accounts' }"
            class="whitespace-nowrap"
            @click="closeUserMenu"
          >
            Dashboard
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            :to="{ name: 'changePassword' }"
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
            <span v-if="isLoading" class="loading loading-spinner"></span>

            <span v-else>Sign Out</span>
          </button>
        </li>
      </template>

      <template v-else>
        <li>
          <NuxtLink
            :to="signInRoute"
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

//const alertStore = useAlertStore()
//const sessionStore = useSessionStore()
//const { isSignedIn } = storeToRefs(sessionStore)

// dummy sign-in/sign-out
const sessionStore = {
  email: "an-email-address@example.com",
  isAdmin: false
}
const isSignedIn = false
const signOut = () => {}
const isLoading = false
const signInRoute = "/"

const route = useRoute()

//const signInRoute = computed(() => (
//  { name: "sign-in", query: { next: route.path } }
//))

function closeUserMenu() {
  elementWithChildren(userMenu.value, (el) => el.blur())
}

//const { isLoading, callApi: signOut } = useApiCall({
//  apiCall: async () => {
//    if (confirm("Are you sure?")) {
//      await RodauthApi.logout()
//    }
//  },
//
//  successCb: () => {
//    alertStore.addMessage(
//      "You have been signed out.", {
//        severity: "success",
//        dismissedIn: 4000
//      }
//    )
//
//    sessionStore.clear()
//  },
//
//  apiErrorCb: () => {
//    alertStore.addMessage(
//      "You couldn't be signed out. Something is wrong with the server.", {
//        severity: "error",
//        dismissOnLeave: true
//      }
//    )
//  },
//
//  fetchErrorCb: () => {
//    alertStore.addMessage(
//      "You couldn't be signed out. The server cannot be reached.", {
//        severity: "error",
//        dismissOnLeave: true
//      }
//    )
//  }
//})
</script>

<style scoped>

</style>
