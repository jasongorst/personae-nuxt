<template>
  <NuxtPage />

  <template v-if="status === 'pending'">
    <CharacterSkeleton />
  </template>

  <template v-else-if="isPositive(filteredCount)">
    <CharacterGrid />

    <CharacterToolbar />
  </template>

  <template v-else>
    <ClientOnly>
      <CharacterEmpty />
    </ClientOnly>
  </template>
</template>

<script setup>
const alert = useAlert()
const personae = usePersonae()
const { characters, filteredCount, isFilterSet, query } = storeToRefs(personae)
const { clearFilter } = usePersonae()

const showSignInModal = useState("showSignInModal")
callOnce(() => showSignInModal.value = true)

const { data, status, refresh: loadCharacters } = await useApi(
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
    clearFilter()
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
