<template>
  <table
    class="w-full table table-pin-rows table-md table-zebra mb-4"
    data-testid="grid"
  >
    <thead>
    <tr class="bg-base-300 z-0">
      <th
        v-for="field in fields"
        :key="field"
        :data-tip="tooltip(sort, field)"
        class="text-secondary select-none font-light table-cell hover:text-primary
          tooltip tooltip-bottom tooltip-primary tooltip-late tooltip-bottom-close"
        @click="$emit('sort', field)"
      >
        <div class="uppercase font-bold flex flex-row gap-0.25 items-center">
          <div>
            {{ _startCase(field) }}
          </div>

          <div class="w-0 overflow-x-visible">
            <Icon
              v-if="sort?.field === field"
              :name="sort?.direction === 'asc' ? 'ph:sort-ascending-bold' : 'ph:sort-descending-bold'"
              size="1.125rem"
              class="block! text-accent"
            />
          </div>
        </div>
      </th>
    </tr>
    </thead>

    <tbody>
    <DataRow
      v-for="row in data"
      :row="row"
      :fields="fields"
      :link-template="linkTemplate"
    />
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  fields: {
    type: Array,
    required: true
  },
  sort: {
    type: Object,
    default: () => ({ field: "id", direction: "asc" }),
    validator: (value) => includesKeys(value, [ "field", "direction" ])
  },
  linkTemplate: {
    type: String
  }
})

const emit = defineEmits([ "sort" ])

function tooltip(sort, field) {
  if (sort?.field === field) {
    if (sort?.direction === "asc") {
      return "Click to reverse sort order."
    } else {
      return "Click for default order."
    }
  } else {
    return `Click to sort by ${_startCase(field)}.`
  }
}
</script>

<style scoped>

</style>
