export const usePersonae = defineStore("personae", () => {
  // state
  const characters = ref([])
  const filter = ref(() => getBlankFilter())
  const query = ref("")

  // getters
  const filteredCharacters = computed(() => (
    characters.value
      .filter((character) => isInFilter(character, filter.value))
  ))

  const filteredCount = computed(() => filteredCharacters.value.length)

  const isFilterSet = computed(() => {
    for (const attribute of filterAttributes) {
      if (isPresent(filter.value[attribute])) {
        return true
      }
    }

    return false
  })

  const totalCount = computed(() => characters.value.length)
  const isLoaded = computed(() => isPositive(totalCount.value))

  // actions
  function resetFilter() {
    filter.value = getBlankFilter()
  }

  function sortCharacters(attribute, direction = "asc") {
    if (direction === "asc") {
      characters.value.sort(compareAsc(attribute))
    } else {
      characters.value.sort(compareDesc(attribute))
    }
  }

  // private
  function getBlankFilter() {
    return _fromPairs(
      filterAttributes.map(
        (attribute) => [ attribute, [] ]
      )
    )
  }

  // true if, for each array of attributes in filter, the array is empty or contains character[attribute]
  function isInFilter(character, filter) {
    let result = true

    // noinspection FunctionWithInconsistentReturnsJS
    _forEach(filter, (values, attribute) => {
      if (!isEmpty(values) && !values.includes(character[attribute])) {
        result = false

        // exit forEach early
        return false
      }
    })

    return result
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
    resetFilter,
    sortCharacters
  }
})
