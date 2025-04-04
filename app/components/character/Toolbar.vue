<template>
  <div class="sticky bottom-0 w-full -mt-4 character-toolbar">
    <div class="bg-primary text-primary-content p-4 text-sm flex flex-row gap-8 items-center justify-between">
      <div class="flex flex-col gap-2">
        <div
          class="whitespace-nowrap"
          data-testid="count"
        >
          Showing
          <strong class="font-bold">{{ filteredCount }}</strong>
          of
          <strong class="font-bold">{{ totalCount }}</strong>

          <span v-if="isPresent(query)">
            search result{{ (totalCount > 1 ? "s" : "") }} for <strong class="font-bold">{{ query }}</strong>
          </span>

          <span v-else>
            character{{ (totalCount > 1 ? "s" : "") }}
          </span>
        </div>
      </div>

      <div class="">
        <NuxtLink
          v-if="isLoggedIn"
          to="/create"
          class="btn btn-xs btn-secondary uppercase"
        >
          Add

          <Icon
            name="ph:plus-bold"
            size="0.85rem"
          />
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

            <Icon
              name="ph:plus-bold"
              size="0.85rem"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const personae = usePersonae()
const { filteredCount, totalCount, query } = storeToRefs(personae)

const { status } = useAuth()
const isLoggedIn = computed(() => status.value === "authenticated")
</script>

<style scoped>
@reference "~/assets/css/main.css";

@layer components {
  .character-toolbar {
    @apply before:block before:sticky before:bottom-20 before:w-full before:h-4 before:bg-gradient-to-t before:from-base-100;
    @apply after:block after:sticky after:bottom-0 after:w-full after:h-4 after:bg-base-100;
  }
}
</style>
