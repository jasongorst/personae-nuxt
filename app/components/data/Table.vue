<template>
  <DataSkeleton
    v-if="isEmpty(data)"
  />

  <template v-else>
    <DataGrid
      :data="sortedData"
      :fields="fields"
      :sort="sort"
      :link-template="linkTemplate"
      @sort="(attribute) => cycleSort(attribute)"
    />

    <DataToolbar
      :count="data.length"
      :name="name"
      :plural-name="pluralName"
      :create-link="createLink"
    />
  </template>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array
  },
  fields: {
    type: Array,
    required: true
  },
  defaultSort: {
    type: Object,
    default: () => ({ field: "id", direction: "asc" }),
    validator: (value) => includesKeys(value, [ "field", "direction" ])
  },
  name: {
    type: String,
    default: "row"
  },
  pluralName: {
    type: String,
    default: (rawProps) => isPresent(rawProps?.name) ? rawProps.name + "s" : "rows"
  },
  linkTemplate: {
    type: String
  },
  createLink: {
    type: String
  }
})

const sort = ref(props.defaultSort)

const sortedData = computed(() => {
  if (sort.value.direction === "asc") {
    return props.data.sort(compareAsc(sort.value.field))
  } else {
    return props.data.sort(compareDesc(sort.value.field))
  }
})

function cycleSort(field) {
  if (sort.value.field === field) {
    if (sort.value.direction === "asc") {
      // current sort field, descending order
      sort.value.direction = "desc"
    } else {
      // default sort
      sort.value.field = props.defaultSort.field
      sort.value.direction = props.defaultSort.direction
    }
  } else {
    // change sort field, ascending order
    sort.value.field = field
    sort.value.direction = "asc"
  }
}
</script>

<style scoped>

</style>
