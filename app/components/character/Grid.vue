<template>
  <table
    class="w-full table table-pin-rows table-md table-zebra mb-4"
    data-testid="grid"
  >
    <thead>
    <tr class="bg-base-300 z-0">
      <th
        v-for="attribute in listAttributes"
        :key="attribute"
        :data-tip="attributeTooltip(attribute)"
        :data-testid="attribute"
        class="text-secondary select-none font-light table-cell hover:text-primary
          tooltip tooltip-bottom tooltip-primary tooltip-late tooltip-bottom-close"
        @click="cycleSort(attribute)"
      >
        <div class="uppercase font-bold flex flex-row gap-0.25 items-center">
          <div>{{ _startCase(attribute) }}</div>

          <div class="w-0 overflow-x-visible">
            <Icon
              v-if="sort.attribute === attribute"
              :name="sort.direction === 'asc' ? 'ph:sort-ascending-bold' : 'ph:sort-descending-bold'"
              size="1.125rem"
              class="block! text-accent"
            />
          </div>
        </div>
      </th>
    </tr>
    </thead>

    <tbody>
    <CharacterRow
      v-for="character in personae.filteredCharacters"
      :key="character.id"
      :character="character"
    />
    </tbody>
  </table>
</template>

<script setup>
const personae = usePersonae()

const sort = ref({
  attribute: "createdAt",
  direction: "asc"
})

function cycleSort(attribute) {
  if (sort.value.attribute === attribute) {
    if (sort.value.direction === "asc") {
      // current sort attribute, descending order
      sort.value.direction = "desc"
    } else {
      // default sort
      sort.value.attribute = "createdAt"
      sort.value.direction = "asc"
    }
  } else {
    // change sort attribute, ascending order
    sort.value.attribute = attribute
    sort.value.direction = "asc"
  }

  personae.sortCharacters(sort.value.attribute, sort.value.direction)
}

function attributeTooltip(attribute) {
  if (sort.value.attribute === attribute) {
    if (sort.value.direction === "asc") {
      return "Click to reverse sort order."
    } else {
      return "Click for default order."
    }
  } else {
    return `Click to sort by ${_startCase(attribute)}.`
  }
}
</script>

<style scoped>

</style>
