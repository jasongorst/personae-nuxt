<template>
  <div class="drawer">
    <input
      id="filter-drawer-toggle"
      type="checkbox"
      class="drawer-toggle"
    >

    <div class="drawer-content">
      <label
        for="filter-drawer-toggle"
        class="drawer-overlay"
      />

      <div class="relative w-full xl:max-w-screen-xl xl:mx-auto">
        <NavBar class="mb-4 lg:mb-6" />

        <AlertMessages />

        <slot />
      </div>
    </div>

    <CharacterFilter />
  </div>
</template>

<script setup>

</script>

<style scoped>
.drawer {
  & .drawer-content {
    @apply grid grid-cols-1 grid-rows-1 items-start justify-items-start;
    width: calc(100% + 18rem);
    transform: translateX(-18rem);
    transition: transform 0.4s cubic-bezier(0, 0, 0.58, 1), width 0.4s cubic-bezier(0, 0, 0.58, 1);

    & .drawer-overlay {
      @apply cursor-pointer bg-transparent;
      transition: background-color 0.2s cubic-bezier(0, 0, 0.58, 1);
    }

    & > * {
      @apply col-start-1 row-start-1;
    }
  }

  & .drawer-toggle:checked {
    & ~ .drawer-content > .drawer-overlay {
      @apply place-self-stretch sticky top-0 z-50 min-[1568px]:hidden;
      background-color: hsl(0 0% 0%/0.4);
    }

    & ~ .drawer-content {
      @apply translate-x-0 xl:translate-x-[calc(640px_-_50vw)] min-[1856px]:-translate-x-[18rem];
    }

    & ~ .drawer-side {
      @apply sticky;
      transform: translateX(0);
    }
  }
}
</style>
