<template>
  <div class="sticky bottom-0 w-full -mt-4 character-toolbar">
    <div class="bg-primary text-primary-content p-4 flex flex-row justify-between text-sm">
      <div class="leading-6">
        showing
        <strong class="font-semibold">{{ filteredCount }}</strong>
        of
        <strong class="font-semibold">{{ totalCount }}</strong>
        {{ (isBlank(query) ? "character" : "search result") + (totalCount > 1 ? "s" : "") }}
      </div>

      <NuxtLink
        v-if="isSignedIn"
        to="/create"
        class="justify-self-end btn btn-xs btn-secondary uppercase"
      >
        Add
        <Icon name="fa6-solid:plus" />
      </NuxtLink>

      <div
        v-else
        class="tooltip tooltip-info tooltip-late tooltip-left md:tooltip-top"
        data-tip="Sign in to add characters."
      >
        <button
          class="btn btn-xs btn-outline btn-disabled uppercase"
          disabled
          type="button"
        >
          Add
          <Icon name="fa6-solid:plus" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["totalCount"])

const charactersStore = useCharactersStore()
const { filteredCount, totalCount, query } = storeToRefs(charactersStore)

//const sessionStore = useSessionStore()
//const { isSignedIn } = storeToRefs(sessionStore)

// dummy isSignedIn
const isSignedIn = ref(true)
</script>

<style scoped>
.character-toolbar {
  @apply before:block before:sticky before:bottom-20 before:w-full before:h-4 before:bg-gradient-to-t before:from-base-100 before:to-transparent;
  @apply after:block after:sticky after:bottom-0 after:w-full after:h-4 after:bg-base-100;
}

.tooltip-late:hover:before,
.tooltip-late:hover:after {
  @apply delay-500;
}
</style>
