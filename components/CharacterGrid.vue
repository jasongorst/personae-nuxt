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
              :name="sort.isAscending ? 'fa6-solid:arrow-down-a-z' : 'fa6-solid:arrow-down-z-a'"
              fixed-width
            />
          </span>
        </th>
      </tr>
      </thead>

      <tbody>
      <CharacterItem
        v-for="character in charactersStore.filteredCharacters"
        :key="character.id"
        :character="character"
      />
      </tbody>
    </table>
  </div>
</template>

<script setup>
const charactersStore = useCharactersStore()

const sort = ref({
  attribute: "id",
  isAscending: true,
})

function updateSort(attribute) {
  if (sort.value.attribute === attribute) {
    if (sort.value.isAscending) {
      sort.value.isAscending = false
      charactersStore.sortCharacters(compareDesc(attribute))
    } else {
      sort.value.attribute = "id"
      sort.value.isAscending = true
      charactersStore.sortCharacters(compareAsc("id"))
    }
  } else {
    sort.value.attribute = attribute
    sort.value.isAscending = true
    charactersStore.sortCharacters(compareAsc(attribute))
  }
}

function attributeTooltip(attribute) {
  if (sort.value.attribute === attribute) {
    if (sort.value.isAscending) {
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
  @apply delay-300;
}
</style>
