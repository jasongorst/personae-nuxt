<template>
  <div class="sticky bottom-0 w-full -mt-4 character-toolbar">
    <div class="bg-primary text-primary-content p-4 flex flex-row items-center justify-between text-sm">
      <div class="flex flex-row gap-2 items-center">
        <div>
          showing
          <strong class="font-semibold">{{ filteredCount }}</strong>
          of
          <strong class="font-semibold">{{ totalCount }}</strong>

          <span v-if="isPresent(query)">
            search result{{ (totalCount > 1 ? "s" : "") }} for &ldquo;{{ query }}&rdquo;
          </span>

          <span v-else>
            character{{ (totalCount > 1 ? "s" : "") }}
          </span>
        </div>

        <div
          v-if="isFilterSet"
          class="flex flex-row items-center flex-wrap gap-2"
        >
          <template
            v-for="(attributeValues, attribute) of filter"
          >
            <div
              v-for="attributeValue in attributeValues"
              class="badge badge-secondary border-none rounded-full gap-0.5 pl-0 whitespace-nowrap"
            >
              <button
                class="btn btn-secondary shadow-none pl-2 pr-1 rounded-l-full max-h-full"
                @click="removeFilter(attribute, attributeValue)"
              >
                <Icon
                  name="ph:x-bold"
                  size="0.75rem"
                />
              </button>

              {{ attributeValue }}
            </div>
          </template>
        </div>
      </div>

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
</template>

<script setup>
const props = defineProps([ "totalCount" ])

const showFilter = useState("show-filter")
const personae = usePersonae()
const { removeFilter } = personae
const { filter, filteredCount, isFilterSet, totalCount, query } = storeToRefs(personae)

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
