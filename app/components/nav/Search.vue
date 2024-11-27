<template>
  <div class="join gap-0 focus-within:outline-base-content/20 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2">
    <input
      v-model.lazy.trim="query"
      :id="inputId"
      class="input input-sm w-40 lg:w-48 border-0 join-item text-base-content focus:!outline-none focus-within:!outline-none"
      placeholder="Search"
      type="search"
    >
    <button
      class="btn btn-sm btn-neutral border-0 join-item focus:!outline-none"
      tabindex="-1"
      type="button"
    >
      <Icon name="fa6-solid:magnifying-glass" />
    </button>
  </div>
</template>

<script setup>
defineProps(["inputId"])

const charactersStore = useCharactersStore()
const { query } = storeToRefs(charactersStore)
</script>

<style scoped>

</style>
