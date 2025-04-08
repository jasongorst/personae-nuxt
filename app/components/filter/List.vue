<template>
  <div
    class="collapse rounded-none w-full bg-base-300"
    :class="showFilter ? 'collapse-open p-4' : 'collapse-close'"
  >
    <div class="relative collapse-content p-0! grid grid-cols-4 gap-2">
      <ul
        v-for="[attribute, attributeValues] in characterAttributeMap"
        :key="attribute"
        class="menu w-full bg-base-200"
        data-testid="attribute"
      >
        <li
          class="menu-title py-1 mb-2 border-y-2 border-primary text-center text-sm uppercase font-bold text-base-content"
          data-testid="heading"
        >
          {{ attribute }}
        </li>

        <li
          v-for="attributeValue in attributeValues"
          :key="attributeValue"
        >
          <label
            :for="`${attribute}_${_snakeCase(attributeValue)}`"
            class="cursor-pointer py-1 px-2 -mx-2"
            :class="!isInAttributeMap(attributeValue, attribute, filteredAttributeMap) && 'text-base-content/50'"
          >
            <UICheckboxField
              :id="`${attribute}_${_snakeCase(attributeValue)}`"
              v-model="filter[attribute]"
              :value="attributeValue"
              size="xs"
              data-testid="checkbox"
            />

            <span
              class="text-sm whitespace-nowrap"
              data-testid="value"
            >
              {{ attributeValue }}
            </span>
          </label>
        </li>

        <li
          v-if="isPresent(filter[attribute])"
        >
          <button
            @click="clearFilterAttribute(attribute)"
            class="btn btn-sm btn-soft btn-secondary uppercase h-8 mt-1"
            data-testid="clear"
          >
            Clear
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const showFilter = useState("show-filter", () => false)
const personae = usePersonae()

const { clearFilterAttribute, removeFilter } = personae
const { characters, filter, filteredCharacters, isFilterSet } = storeToRefs(personae)

const characterAttributeMap = computed(() => attributeMap(characters.value))
const filteredAttributeMap = computed(() => attributeMap(filteredCharacters.value))

// sorted unique, non-null, non-empty values of (attributes of filterAttributes) in collection
function attributeMap(collection) {
  return new Map(
    filterAttributes.map((attribute) => [
      attribute,
      _uniq(collection.map((character) => character[attribute]))
        .filter(isPresent)
        .sort()
    ])
  )
}

function isInAttributeMap(attributeValue, attribute, attributeMap) {
  const values = attributeMap.get(attribute)
  return (isEmpty(values) || values.includes(attributeValue))
}
</script>

<style scoped>
@reference "~/assets/css/main.css";

@layer components {
  .label-disabled {
    @apply text-base-content/40 cursor-not-allowed!;
  }
}
</style>
