function getBlankFilter() {
  return _fromPairs(
    filterAttributes.map(
      (attribute) => [attribute, []]
    )
  )
}

// true if, for each array of attributes in filter, the array is empty or contains character[attribute]
function isInFilter(character, filter) {
  let result = true

  _forEach(filter, (values, attribute) => {
    if (!isEmpty(values) && !values.includes(character[attribute])) {
      result = false

      // exit forEach early
      return false
    }
  })

  return result
}

export default defineStore("characters", {
  state: () => ({
    characters: [],
    filter: getBlankFilter(),
    query: ""
  }),

  getters: {
    filteredCharacters(state) {
      return state.characters.filter(
        (character) => isInFilter(character, state.filter)
      )
    },

    filteredCount() {
      return this.filteredCharacters.length
    },

    isFilterSet(state) {
      for (const attribute of filterAttributes) {
        if (isPresent(state.filter[attribute])) {
          return true
        }
      }

      return false
    },

    isLoaded() {
      return isPositive(this.totalCount)
    },

    totalCount(state) {
      return state.characters.length
    },
  },

  actions: {
    resetFilter() {
      this.filter = getBlankFilter()
    },

    sortCharacters(attribute, direction = "asc") {
      if (direction === "asc") {
        this.characters.sort(compareAsc(attribute))
      } else {
        this.characters.sort(compareDesc(attribute))
      }
    }
  }
})
