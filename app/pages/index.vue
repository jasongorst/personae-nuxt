<template>
  <NuxtPage />

  <template v-if="isPositive(personae.filteredCount)">
    <CharacterGrid />

    <CharacterToolbar />
  </template>

  <template v-else>
    <ClientOnly>
      <div class="hero h-[calc((100vh-7rem)*2/3)] lg:h-[calc((100vh-7rem)*2/3)] mx-auto md:w-11/12 lg:w-5/6">
        <div class="hero-content bg-base-300 text-center py-6 px-8 md:py-8 md:px-12 text-3xl lg:text-4xl">
          <template v-if="isPresent(query)">
            <span v-if="personae.isFilterSet">
<!--          query set, filter set -->
              Sorry, none of the search results match the filter.
            </span>

            <span v-else>
<!--          query set, no filter -->
              Sorry, no characters match <em>{{ query }}</em>.
            </span>
          </template>

          <template v-else>
            <span v-if="personae.isFilterSet">
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
const alert = useAlert()
const personae = usePersonae()
const { characters, query } = storeToRefs(personae)

const showSignInModal = useState("showSignInModal")
callOnce(() => showSignInModal.value = true)

const { data, refresh: loadCharacters } = await useApi(
  "/characters", {
    manual: true,
    query: { q: query },
    transform: (data) => deepParseTimestamps(deepConvertKeys(data, _camelCase)),

    onRequestError: () => alert.add(
      "Couldn't load characters. The server cannot be reached.", {
        severity: "error",
        dismissOnLeave: true
      }
    ),

    onResponseError: () => alert.add(
      "Couldn't load characters. Something is wrong with the server.", {
        severity: "error",
        dismissOnLeave: true
      }
    )
  }
)

watch(
  query,
  async () => {
    personae.resetFilter()
    await loadCharacters()

    if (!_isUndefined(data.value)) {
      characters.value = data.value
    }
  },
  { immediate: true }
)
</script>

<style scoped>

</style>
