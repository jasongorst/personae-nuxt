<template>
  <div class="drawer-side">
    <div class="p-6 md:p-8 w-72 h-full bg-base-200 text-base-content overflow-y-auto z-20">
      <button
        type="button"
        v-if="charactersStore.isFilterSet"
        @click="charactersStore.resetFilter"
        class="btn btn-sm btn-accent btn-block uppercase mb-6"
      >
        Clear Filter
      </button>

      <ul
        v-for="[attribute, values] in characterAttributeMap"
        :key="attribute"
        class="menu p-0"
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
            class="label cursor-pointer justify-start gap-2 py-1 px-2 -mx-2"
          >
            <input
              :id="`${attribute}_${_snakeCase(value)}`"
              v-model="charactersStore.filter[attribute]"
              type="checkbox"
              :value="value"
              class="checkbox checkbox-xs"
            >
            <span
              :class="{ 'opacity-60': !isInAttributeMap(value, attribute, filteredAttributeMap) }"
              class="label-text text-sm"
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
const charactersStore = useCharactersStore()

const characterAttributeMap = computed(() => attributeMap(charactersStore.characters))
const filteredAttributeMap = computed(() => attributeMap(charactersStore.filteredCharacters))

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
  return (_isEmpty(values) || values.includes(value))
}
</script>

<style scoped>
.drawer-side {
  @apply static w-full -translate-x-[18rem];
  transition: transform 300ms cubic-bezier(0, 0, 0.58, 1);

  & > *:not(&.drawer-overlay) {
    @apply translate-x-0;
  }

  & ul {
    @apply pb-6;

    &:last-child {
      @apply pb-0;
    }
  }
}
</style>
