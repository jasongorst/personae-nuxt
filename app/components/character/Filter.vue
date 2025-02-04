<template>
  <div class="drawer-side">
    <label
      aria-label="close filter sidebar"
      class="drawer-overlay"
      @click="showFilter = false"
    />

    <div class="p-6 w-64 h-full bg-base-200 text-base-content overflow-y-auto z-20">
      <button
        type="button"
        v-if="personae.isFilterSet"
        @click="personae.resetFilter"
        class="btn btn-sm btn-accent btn-block uppercase mb-6"
      >
        Clear Filter
      </button>

      <ul
        v-for="[attribute, values] in characterAttributeMap"
        :key="attribute"
        class="w-full menu p-0 not-last:pb-6"
      >
        <li class="menu-title text-base-content inline-flex flex-shrink-0 flex-wrap items-center justify-center text-center w-full py-1 mb-2 border-t-2 border-b-2 border-primary text-sm uppercase font-bold">
          {{ attribute }}
        </li>

        <li
          v-for="value in values"
          :key="value"
          class="form-control p-0"
        >
          <label
            :for="`${attribute}_${_snakeCase(value)}`"
            class="cursor-pointer justify-start gap-2 py-1 px-2 -mx-2"
          >
            <input
              :id="`${attribute}_${_snakeCase(value)}`"
              v-model="personae.filter[attribute]"
              type="checkbox"
              :value="value"
              class="checkbox checkbox-xs"
            >

            <span
              :class="{ 'text-current/60': !isInAttributeMap(value, attribute, filteredAttributeMap) }"
              class="text-sm"
            >
              {{ value }}
            </span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const showFilter = useState("show-filter")
const personae = usePersonae()

const characterAttributeMap = computed(() => attributeMap(personae.characters))
const filteredAttributeMap = computed(() => attributeMap(personae.filteredCharacters))

// sorted unique, non-null, non-empty values of (attributes of filterAttributes) in characters
function attributeMap(characters) {
  const result = new Map()

  for (const attribute of filterAttributes) {
    result.set(attribute, _uniq(characters.map((character) => character[attribute])).filter(isPresent).sort())
  }

  return result
}

function isInAttributeMap(value, attribute, attributeMap) {
  const values = attributeMap.get(attribute)
  return (isEmpty(values) || values.includes(value))
}
</script>

<style scoped>
/*
@reference "~/assets/css/main.css";

@layer components {
  .drawer-side {
    @apply static w-full -translate-x-[18rem];
    transition: transform 300ms cubic-bezier(0, 0, 0.58, 1);

    & > *:not(&.drawer-overlay) {
      @apply translate-x-0;
    }
  }
}
*/
</style>
