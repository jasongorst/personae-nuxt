<template>
  <tr data-testid="data-row">
    <td v-for="field in fields">
      {{ row[field] }}
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  row: Object,
  fields: Array
})
</script>

<style scoped>

</style>
