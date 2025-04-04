export const usePersonae = defineStore("personae", () => {
  // state
  const characters = ref([])
  const filter = ref(getBlankFilter())
  const query = ref("")

  // getters
  const filteredCharacters = computed(() => (
    characters.value
      .filter((character) => isInFilter(character, filter.value))
  ))

  const filteredCount = computed(() => filteredCharacters.value.length)

  const isFilterSet = computed(() => _some(
    filterAttributes,
    (attribute) => isPresent(filter.value[attribute])
  ))

  const totalCount = computed(() => characters.value.length)
  const isLoaded = computed(() => isPositive(totalCount.value))

  // actions
  function addFilter(attribute, attributeValue) {
    filter.value[attribute] = _union(filter.value[attribute], [ attributeValue ])
  }

  function clearFilter() {
    filter.value = getBlankFilter()
  }

  function clearFilterAttribute(attribute) {
    filter.value[attribute] = []
  }

  function removeFilter(attribute, attributeValue) {
    filter.value[attribute] = _without(filter.value[attribute], attributeValue)
  }

  function sortCharacters(attribute, direction = "asc") {
    if (direction === "asc") {
      characters.value.sort(compareAsc(attribute))
    } else {
      characters.value.sort(compareDesc(attribute))
    }
  }

  // true if, for each array of attributes in filter, the array is empty or contains character[attribute]
  function isInFilter(character, filter) {
    return _every(
      filter,
      (values, attribute) => (_isEmpty(values) || _includes(values, character[attribute])))
  }

  return {
    characters,
    filter,
    query,
    filteredCharacters,
    filteredCount,
    isFilterSet,
    totalCount,
    isLoaded,
    addFilter,
    clearFilter,
    clearFilterAttribute,
    removeFilter,
    sortCharacters
  }
})

// hmr support
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePersonae, import.meta.hot))
}
