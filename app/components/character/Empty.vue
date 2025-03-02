<template>
  <div class="hero h-[calc((100vh-7rem)*2/3)] lg:h-[calc((100vh-7rem)*2/3)] mx-auto md:w-11/12 lg:w-5/6">
    <div class="hero-content bg-base-300 text-center py-6 px-8 md:py-8 md:px-12 text-3xl lg:text-4xl">
      <template v-if="isPresent(query)">
            <span v-if="isFilterSet">
<!--          query set, filter set -->
              Sorry, none of the search results match the filter.
            </span>

        <span v-else>
<!--          query set, no filter -->
              Sorry, no characters match <em>{{ query }}</em>.
            </span>
      </template>

      <template v-else>
            <span v-if="isFilterSet">
<!--          no query, filter set -->
              Sorry, no characters match the filter.
            </span>
      </template>
    </div>
  </div>
</template>

<script setup>
const personae = usePersonae()
const { isFilterSet, query } = storeToRefs(personae)
</script>

<style scoped>

</style>
