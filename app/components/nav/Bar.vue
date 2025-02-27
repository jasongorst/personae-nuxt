<template>
  <div class="navbar bg-primary text-primary-content gap-4">
    <div class="md:hidden">
      <details
        id="hamburger-menu-dropdown"
        ref="hamburgerMenuRef"
        class="dropdown"
      >
        <summary class="btn btn-primary normal-case">
          <Icon
            name="ph:list-bold"
            size="1.125rem"
          />
        </summary>

        <ul
          class="dropdown-content menu gap-1 w-52 shadow bg-primary z-10 whitespace-nowrap"
        >
          <li>
            <NuxtLink to="/"> Home </NuxtLink>
          </li>

          <li v-if="currentRoute === '/'">
            <button type="button" @click="showFilter = true">
              Filter
            </button>
          </li>

          <li v-if="currentRoute === '/'">
            <div class="p-0 active:text-primary-content! active:bg-primary!">
              <NavSearch
                id="dropdown_search"
                size="sm"
                wrapper-class="w-full hover:outline-2 hover:outline-primary-content/50"
              />
            </div>
          </li>

          <li>
            <a
              class="flex flex-row gap-1"
              href="https://rae.evilpaws.org/"
              rel="nofollow"
              @click="confirm('Ready to leave?', $event)"
            >
              rae.evilpaws.org

              <Icon
                name="ph:arrow-square-out-bold"
                size="1.25rem"
              />
            </a>
          </li>
        </ul>
      </details>
    </div>

    <div class="btn btn-primary normal-case text-lg">
      <NuxtLink to="/" class="whitespace-nowrap">
        <Icon name="personae" />
        <!--        Dramatis Personae-->
        Personae/DaisyUI 5
      </NuxtLink>
    </div>

    <div class="hidden md:flex grow gap-2">
      <NavSearch
        v-if="currentRoute === '/'"
        id="navbar_search"
        size="md"
        wrapper-class="grow"
      />

      <button
        v-if="currentRoute === '/'"
        type="button"
        class="btn btn-primary normal-case"
        @click="showFilter = !showFilter"
      >
        <Icon
          name="ph:funnel-simple-bold"
          size="1.25rem"
        />

        Filter
      </button>
    </div>

    <div class="flex justify-end">
      <div class="hidden md:flex">
        <a
          href="https://rae.evilpaws.org/"
          rel="nofollow"
          class="btn btn-primary normal-case flex-row gap-1"
          @click="confirm('Ready to leave?', $event)"
        >
          <div class="hidden lg:block">rae.evilpaws.org</div>

          <Icon
            name="ph:arrow-square-out-bold"
            size="1.25rem"
          />
        </a>
      </div>

      <NavUserMenu />
    </div>
  </div>
</template>

<script setup>
const showFilter = useState("show-filter");
const route = useRoute();
const currentRoute = computed(() => route.path);
const hamburgerMenuRef = ref(null);

async function showFilterSidebar() {
  hamburgerMenuRef.value.open = false;
  showFilter.value = true;
}
</script>

<style scoped></style>
