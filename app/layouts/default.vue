<template>
  <div class="drawer 2xl:drawer-open">
    <input
      id="filter-drawer-toggle"
      type="checkbox"
      class="drawer-toggle"
    >

    <div class="drawer-content">
      <BaseContainer>
        <slot />
      </BaseContainer>
    </div>

    <CharacterFilter />
  </div>
</template>

<script setup>

</script>

<style scoped>
/*
@reference "~/assets/css/main.css";

@layer components {
  .drawer {
    & .drawer-content {
      @apply grid grid-cols-1 grid-rows-1 items-start justify-items-start;
      @apply w-[calc(100%_+_18rem)] -translate-x-[18rem];
      transition: transform 300ms cubic-bezier(0, 0, 0.58, 1), width 300ms cubic-bezier(0, 0, 0.58, 1);

      & .drawer-overlay {
        @apply cursor-pointer bg-transparent;
        transition: background-color 150ms cubic-bezier(0, 0, 0.58, 1);
      }

      & > * {
        @apply col-start-1 row-start-1;
      }
    }

    & .drawer-toggle:checked {
      & ~ .drawer-content > .drawer-overlay {
        @apply bg-base-300/50 place-self-stretch sticky top-0 z-50 min-[1568px]:hidden;
      }

      & ~ .drawer-content {
        @apply translate-x-0 xl:translate-x-[calc(640px_-_50vw)] min-[1856px]:-translate-x-[18rem];
      }

      & ~ .drawer-side {
        @apply sticky translate-x-0;
      }
    }
  }
}
*/
</style>
