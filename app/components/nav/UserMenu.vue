<template>
  <details
    class="dropdown dropdown-bottom dropdown-end"
    ref="userMenuRef"
  >
    <summary class="btn btn-ghost">
      <Icon
        v-if="loggedIn"
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
      <template v-if="loggedIn">
        <li class="menu-title text-primary-content/55 whitespace-nowrap">
          {{ user.username }}
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
          <button
            type="button"
            class="whitespace-nowrap"
            @click="signOut"
          >
            Sign Out
          </button>
        </li>
      </template>

      <template v-else>
        <li>
          <button
            type="button"
            class="whitespace-nowrap"
            @click="showAuthModal"
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

  <AuthSignInModal
    :showModal="showSignInModal"
    @close="showSignInModal = false"
  />
</template>

<script setup>
const alertStore = useAlertStore()

// nuxt-auth (password-based login via personae-api)
const { signOut: nuxtAuthLogOut } = useAuth()

// nuxt-auth-utils (webauthn via local db)
const { loggedIn, user, session, clear: nuxtAuthUtilsLogOut } = useUserSession()

const userMenuRef = ref(null)
const showSignInModal = ref(false)

function showAuthModal() {
  showSignInModal.value = true
  closeUserMenu()
}

async function signOut() {
  if (session.value?.loggedInWith === "nuxt-auth") {
    await nuxtAuthLogOut({ redirect: false })
  }

  await nuxtAuthUtilsLogOut()
  closeUserMenu()

  alertStore.addMessage(
    "You've been signed out.", {
      severity: "success",
      dismissedIn: 4000
    }
  )
}

function closeUserMenu() {
  userMenuRef.value.open = false
}
</script>

<style scoped>

</style>
