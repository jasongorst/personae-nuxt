<template>
  <details
    class="dropdown dropdown-bottom dropdown-end"
    ref="userMenuRef"
  >
    <summary class="btn btn-ghost">
      <Icon
        v-if="isLoggedIn"
        name="fa6-solid:circle-user"
      />

      <Icon
        v-else
        name="fa6-regular:circle-user"
      />
    </summary>

    <ul class="dropdown-content menu w-52 mt-3 p-2 shadow bg-primary rounded-box z-10 whitespace-nowrap">
      <template v-if="isLoggedIn">
        <li class="menu-title text-primary-content/55 whitespace-nowrap">
          {{ user.email }}
        </li>

        <li v-if="user.admin">
          <NuxtLink
            to="/dashboard/account"
            @click="closeUserMenu"
          >
            Dashboard
          </NuxtLink>
        </li>

        <li>
          <UILoadingButton
            class="whitespace-nowrap"
            :is-loading="isLoading"
            @click="useSignOut"
          >
            Sign Out
          </UILoadingButton>
        </li>
      </template>

      <template v-else>
        <li>
          <button
            type="button"
            class="whitespace-nowrap"
            @click="signIn"
          >
            Sign In
          </button>
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
const userMenuRef = ref(null)
const alertStore = useAlertStore()
const { status, data: user, signOut } = useAuth()

const isLoading = computed(() => status.value === "loading")
const isLoggedIn = computed(() => status.value === "authenticated")

async function useSignOut() {
  await signOut({ redirect: false })

  alertStore.addMessage(
    "You've been signed out.", {
      severity: "success",
      dismissedIn: 4000
    }
  )

  closeUserMenu()
}

function signIn() {
  closeUserMenu()
  navigateTo("/sign-in")
}

function closeUserMenu() {
  userMenuRef.value.open = false
}
</script>

<style scoped>

</style>
