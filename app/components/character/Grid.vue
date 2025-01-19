<template>
  <div>
    <table class="w-full table table-pin-rows table-sm xl:table-md table-zebra mb-4">
      <thead>
      <tr class="bg-base-300">
        <th
          v-for="attribute of listAttributes"
          :key="attribute"
          :data-tip="attributeTooltip(attribute)"
          class="text-secondary select-none tooltip tooltip-bottom tooltip-near tooltip-late tooltip-primary font-light hover:text-primary table-cell"
          @click="updateSort(attribute)"
        >
          <span class="uppercase font-bold">
            {{ _startCase(attribute) }}
          </span>

          <span class="inline-block w-0 overflow-x-visible text-accent">
            <Icon
              v-if="sort.attribute === attribute"
              :name="sort.sortDirection === 'asc' ? 'fa6-solid:arrow-down-a-z' : 'fa6-solid:arrow-down-z-a'"
              class="w-[1.25em] h-[1em] -mt-[0.1667em]"
            />
          </span>
        </th>
      </tr>
      </thead>

      <tbody>
      <CharacterItem
        v-for="character in personae.filteredCharacters"
        :key="character.id"
        :character="character"
      />
      </tbody>
    </table>
  </div>
</template>

<script setup>
const personae = usePersonae()

const sort = ref({
  attribute: "createdAt",
  sortDirection: "asc"
})

function updateSort(attribute) {
  if (sort.value.attribute === attribute) {
    if (sort.value.sortDirection === "asc") {
      sort.value.sortDirection = "desc"
    } else {
      sort.value.attribute = "createdAt"
      sort.value.sortDirection = "asc"
    }
  } else {
    sort.value.attribute = attribute
    sort.value.sortDirection = "asc"
  }

  personae.sortCharacters(sort.value.attribute, sort.value.sortDirection)
}

function attributeTooltip(attribute) {
  if (sort.value.attribute === attribute) {
    if (sort.value.sortDirection === "asc") {
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
.tooltip-near {
  --tooltip-offset: calc(100% + 1px - 0.4125rem + var(--tooltip-tail, 0px));
  --tooltip-tail: 0.1875rem;
  --tooltip-tail-offset: calc(100% + 0.0625rem - 0.4125rem - var(--tooltip-tail));
}

.tooltip-late:hover:before,
.tooltip-late:hover:after {
  @apply delay-500;
}
</style>
