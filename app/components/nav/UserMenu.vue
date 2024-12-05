<template>
  <details
    class="dropdown dropdown-bottom dropdown-end"
    ref="userMenu"
  >
    <summary class="btn btn-ghost">
      <Icon
        v-if="status === 'authenticated'"
        name="fa6-solid:circle-user"
      />

      <Icon
        v-else-if="status === 'unauthenticated'"
        name="fa6-regular:circle-user"
      />

      <span
        v-else
        class="loading loading-spinner"><!--
   --></span>
    </summary>

    <ul
      class="dropdown-content menu w-52 mt-3 p-2 shadow bg-primary rounded-box z-10 whitespace-nowrap"
    >
      <template v-if="status === 'authenticated'">
        <li class="menu-title text-primary-content/55 whitespace-nowrap">
          {{ data.email }}
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
            @click="handleSignOut"
          >
            <span
              v-if="status === 'loading'"
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
const { status, data, signOut } = useAuth()

function closeUserMenu() {
  userMenu.value.open = false
}

async function handleSignOut() {
  await signOut()
  closeUserMenu()
}
</script>

<style scoped>

</style>
