<template>
  <template v-if="isPositive(charactersStore.filteredCount)">
    <CharacterGrid />

    <CharacterToolbar />
  </template>

  <template v-else>
    <ClientOnly>
      <div class="hero h-[calc((100vh-7rem)*2/3)] lg:h-[calc((100vh-7rem)*2/3)] mx-auto md:w-11/12 lg:w-5/6">
        <div class="hero-content bg-base-300 text-center py-6 px-8 md:py-8 md:px-12 text-3xl lg:text-4xl">
          <template v-if="isPresent(query)">
            <span v-if="charactersStore.isFilterSet">
<!--          query set, filter set -->
              Sorry, none of the search results match the filter.
            </span>

            <span v-else>
<!--          query set, no filter -->
              Sorry, no characters match <em>{{ query }}</em>.
            </span>
          </template>

          <template v-else>
            <span v-if="charactersStore.isFilterSet">
<!--          no query, filter set -->
              Sorry, no characters match the filter.
            </span>
          </template>
        </div>
      </div>
    </ClientOnly>
  </template>
</template>

<script setup>
const charactersStore = useCharactersStore()
const { characters, query } = storeToRefs(charactersStore)

const { data, refresh: loadCharacters } = await useFetch(
  "http://localhost:3000/characters",
  {
    query: { q: query },
    transform: (data) => deepConvertKeys(data, _camelCase)
  }
)

watch(
  query,
  async () => {
    charactersStore.resetFilter()
    await loadCharacters()

    if (!_isUndefined(data.value)) {
      characters.value = data.value
    }
  },
  { immediate: true }
)

// add some dummy alerts
callOnce(() => {
  const alertStore = useAlertStore()

  alertStore.addMessage(
    "This is a test.", {
      severity: "info",
      dismissable: true,
      dismissedIn: 4 * 1000
    }
  )

  alertStore.addMessage(
    "This is only a test.", {
      severity: "success",
      dismissable: true
    }
  )

  alertStore.addMessage(
    "This is also a test.", {
      severity: "warning",
      dismissable: false,
      dismissedIn: 4 * 1000
    }
  )
})
</script>

<style scoped>

</style>
