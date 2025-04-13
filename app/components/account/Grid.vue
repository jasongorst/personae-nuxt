<template>
  <table
    class="w-full table table-pin-rows table-md table-zebra mb-4"
    data-testid="account-grid"
  >
    <thead>
    <tr class="bg-base-300 z-0">
      <th
        v-for="attribute in accountAttributes"
        :key="attribute"
        :data-tip="attributeTooltip(sort, attribute)"
        class="text-secondary select-none font-light table-cell hover:text-primary
          tooltip tooltip-bottom tooltip-primary tooltip-late tooltip-bottom-close"
        @click="$emit('sort', attribute)"
      >
        <div class="uppercase font-bold flex flex-row gap-0.25 items-center">
          <div>
            {{ _startCase(attribute) }}
          </div>

          <div class="w-0 overflow-x-visible">
            <Icon
              v-if="sort?.attribute === attribute"
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
    <AccountRow
      v-for="account in accounts"
      :account="account"
      :account-attributes="accountAttributes"
    />
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  accounts: {
    type: Array,
    default: () => []
  },
  accountAttributes: {
    type: Array,
    default: () => []
  },
  sort: {
    type: Object,
    default: () => ({ attribute: "id", direction: "asc" }),
    validator: (value) => includesKeys(value, [ "attribute", "direction" ])
  }
})

const emit = defineEmits([ "sort" ])

function attributeTooltip(sort, attribute) {
  if (sort?.attribute === attribute) {
    if (sort?.direction === "asc") {
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
