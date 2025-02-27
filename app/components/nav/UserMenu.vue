<template>
  <details
    class="dropdown dropdown-bottom dropdown-end"
    ref="userMenuRef"
  >
    <summary class="btn btn-primary">
      <Icon
        :name="isLoggedIn ? 'ph:user-circle-fill' : 'ph:user-circle-light'"
        size="1.25rem"
      />
    </summary>

    <ul class="dropdown-content menu gap-1 w-52 shadow bg-primary z-10 whitespace-nowrap">
      <template v-if="isLoggedIn">
        <li class="menu-title py-1.5 text-primary-content/60 whitespace-nowrap">
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
const alert = useAlert()
const { status, data: user, signOut } = useAuth()

const isLoading = computed(() => status.value === "loading")
const isLoggedIn = computed(() => status.value === "authenticated")

async function useSignOut() {
  await signOut({ redirect: false })

  alert.add(
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
