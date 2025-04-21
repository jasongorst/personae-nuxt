<template>
  <tr
    class="hover"
    data-testid="data-row"
  >
    <td
      v-for="field in fields"
      :key="field"
      class="p-0!"
    >
      <!--suppress HtmlUnknownTarget -->
      <NuxtLink
        v-if="isPresent(rowLink)"
        :to="rowLink(row)"
        class="inline-block w-full px-3 py-2 xl:px-4 xl:py-3"
      >
        {{ isPresent(row[field]) ? row[field] : "&nbsp;" }}
      </NuxtLink>

      <div
        v-else
        class="inline-block w-full px-3 py-2 xl:px-4 xl:py-3"
      >
        {{ isPresent(row[field]) ? row[field] : "&nbsp;" }}
      </div>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  row: {
    type: Object,
    required: true
  },
  fields: {
    type: Array,
    required: true
  },
  rowLink: {
    type: Function
  }
})
</script>

<style scoped>

</style>
