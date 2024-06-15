<template>
  <LoadingModal v-if="isLoading" />

  <template v-else>
    <template v-if="isPositive(charactersStore.filteredCount)">
      <CharacterGrid />

      <CharacterToolbar />
    </template>

    <template v-else>
      <div class="hero h-[calc((100vh-7rem)*2/3)] lg:h-[calc((100vh-7rem)*2/3)] mx-auto md:w-11/12 lg:w-5/6">
        <div class="hero-content bg-base-300 text-center py-6 px-8 md:py-8 md:px-12 text-3xl lg:text-4xl">
          <span v-html="zeroItemsMessage()"></span>
        </div>
      </div>
    </template>
  </template>
</template>

<script setup>
const charactersStore = useCharactersStore()
const alertStore = useAlertStore()

const url = ref("")
const { query } = storeToRefs(charactersStore)

// dummy isLoading
const isLoading = false

//const { isLoading, response: characters, callApi: loadCharacters } = useApiCall({
//  apiCall: () => request("get", url.value),
//
//  apiErrorCb: () => {
//    alertStore.addMessage(
//      "Couldn't load characters. Something is wrong with the server.", {
//        severity: "error",
//        dismissedIn: 0,
//        dismissOnLeave: true
//      }
//    )
//  },
//
//  fetchErrorCb: () => {
//    alertStore.addMessage(
//      "Couldn't load characters. The server cannot be reached.", {
//        severity: "error",
//        dismissedIn: 0,
//        dismissOnLeave: true
//      }
//    )
//  }
//})

watch(
  query,
  async (newQuery) => {
    //if (isBlank(newQuery)) {
    //  url.value = CharactersApi.index.path()
    //} else {
    //  url.value = CharactersApi.search.path({ query: { q: newQuery } })
    //}
    //
    //// fetch characters
    //await loadCharacters()
    //
    //if (typeof characters.value !== "undefined") {
    //  charactersStore.characters = characters.value
    //
    //  // reset filter since characters has changed
    //  charactersStore.resetFilter()
    //}
  },
  { immediate: true }
)

function zeroItemsMessage() {
  if (isBlank(query.value) && (charactersStore.isFilterSet)) {
    // no query, filter set
    return "Sorry, no characters match the filter."
  } else if (isBlank(query.value)) {
    // no query, no filter (!)
    return "Sorry, something is wrong. You shouldn't be seeing this."
  } else if (charactersStore.isFilterSet) {
    // query set, filter set
    return "Sorry, none of the search results match the filter."
  } else {
    // query set, no filter
    return `Sorry, no characters match <em>${query.value}</em>.`
  }
}
</script>

<style scoped>

</style>
