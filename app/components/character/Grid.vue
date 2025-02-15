<template>
  <table class="w-full table table-pin-rows table-md table-zebra mb-4">
    <thead>
    <tr class="bg-base-300 z-0">
      <th
        v-for="attribute of listAttributes"
        :key="attribute"
        :data-tip="attributeTooltip(attribute)"
        class="text-secondary select-none font-light table-cell text-center tooltip tooltip-bottom tooltip-primary tooltip-late tooltip-bottom-near hover:text-primary"
        @click="updateSort(attribute)"
      >
        <span class="uppercase font-bold">
          {{ _startCase(attribute) }}
        </span>

        <span class="inline-block w-0 overflow-x-visible text-accent">
          <Icon
            v-if="sort.attribute === attribute"
            :name="sort.direction === 'asc' ? 'fa6-solid:arrow-down-a-z' : 'fa6-solid:arrow-down-z-a'"
            class="w-[1.25em] h-[1em] -mt-[0.1667em]"
          />
        </span>
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

function updateSort(attribute) {
  if (sort.value.attribute === attribute) {
    if (sort.value.direction === "asc") {
      sort.value.direction = "desc"
    } else {
      sort.value.attribute = "createdAt"
      sort.value.direction = "asc"
    }
  } else {
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
