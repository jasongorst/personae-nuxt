<template>
  <div
    v-if="isFilterSet && !showFilter"
    class="bg-base-200 flex flex-row flex-wrap gap-2 px-4 py-2 items-center"
    data-testid="summary"
  >
    <template
      v-for="(attributeValues, attribute) in filter"
      :key="attribute"
    >
      <div
        v-for="attributeValue in attributeValues"
        :key="attributeValue"
        class="badge badge-secondary border-none rounded-full gap-0 pl-0 whitespace-nowrap"
        data-testid="value"
      >
        <button
          class="btn btn-secondary shadow-none pl-2 pr-1 rounded-l-full max-h-full"
          @click="removeFilter(attribute, attributeValue)"
          data-testid="button"
        >
          <Icon
            name="ph:x-bold"
            size="0.75rem"
          />
        </button>

        {{ attributeValue }}
      </div>
    </template>
  </div>
</template>

<script setup>
const showFilter = useState("show-filter")
const personae = usePersonae()
const { filter, isFilterSet } = storeToRefs(personae)
const { removeFilter } = personae
</script>

<style scoped>

</style>
