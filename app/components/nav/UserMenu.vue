<!--suppress IncorrectFormatting -->
<template>
  <details
    class="dropdown dropdown-bottom dropdown-end"
    ref="userMenu"
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
const { loggedIn, user, clear } = useUserSession()

const userMenu = ref(null)
const showSignInModal = ref(false)

function showAuthModal() {
  showSignInModal.value = true
  closeUserMenu()
}

async function signOut() {
  await clear()
  closeUserMenu()

  alertStore.addMessage(
    "You've been signed out.", {
      severity: "success",
      dismissedIn: 4000
    }
  )
}

function closeUserMenu() {
  userMenu.value.open = false
}
</script>

<style scoped>

</style>
