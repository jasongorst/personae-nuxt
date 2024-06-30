<template>
  <div class="navbar bg-primary text-primary-content">
    <div class="md:hidden">
      <details
        id="hamburger-menu-dropdown"
        class="dropdown"
      >
        <summary
          class="btn btn-ghost normal-case"
        >
          <Icon name="fa6-solid:bars" />
        </summary>

        <ul class="dropdown-content menu mt-3 p-2 shadow bg-primary rounded-box z-10 whitespace-nowrap">
          <li>
            <NuxtLink to="/">
              Home
            </NuxtLink>
          </li>

          <li v-if="currentRoute === '/'">
            <button type="button">
              <label
                for="filter-drawer-toggle"
                class="drawer-button"
              >
                Filter
              </label>
            </button>
          </li>

          <li v-if="currentRoute === '/'">
            <div>
              <NavSearch input-id="dropdown_search" />
            </div>
          </li>

          <li>
            <a
              href="https://rae.evilpaws.org/"
              rel="nofollow"
              @click="confirm('Ready to leave?', $event)"
            >
              rae.evilpaws.org
              <Icon name="fa-solid:external-link-alt" />
            </a>
          </li>
        </ul>
      </details>
    </div>

    <div class="btn btn-ghost normal-case text-lg">
      <NuxtLink
        to="/"
        class="whitespace-nowrap"
      >
        <Icon name="fa6-solid:masks-theater" />
        Dramatis Personae
      </NuxtLink>
    </div>

    <div class="hidden md:flex">
      <button
        v-if="currentRoute === '/'"
        type="button"
      >
        <label
          for="filter-drawer-toggle"
          class="drawer-button btn btn-ghost normal-case"
        >
          <span class="hidden min-[1568px]:inline-grid min-[1568px]:swap filter-icon">
            <Icon
              class="swap-off"
              name="fa6-solid:arrow-right-to-bracket"
            />

            <Icon
              class="swap-on rotate-180"
              name="fa6-solid:arrow-right-to-bracket"
            />
          </span><!--

       -->Filter
        </label>
      </button>
    </div>

    <div class="flex grow justify-end">
      <div class="hidden md:flex md:pr-4">
        <NavSearch
          v-if="currentRoute === '/'"
          input-id="navbar_search"
        />
      </div>

      <div class="hidden md:flex">
        <a
          href="https://rae.evilpaws.org/"
          rel="nofollow"
          class="btn btn-ghost normal-case"
          @click="confirm('Ready to leave?', $event)"
        >
          <span class="md:hidden lg:inline">
            rae.evilpaws.org
          </span>
          <Icon name="fa-solid:external-link-alt" />
        </a>
      </div>

      <NavUserMenu />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const currentRoute = computed(() => route.path)
</script>

<style scoped>
.drawer-toggle:checked {
  & ~ .drawer-content {
    & .filter-icon {
      @apply swap-active;
    }
  }
}
</style>
