<template>
  <tr
    :data-testid="`row_${character.id}`"
  >
    <td>{{ character.player }}</td>
    <td>{{ character.name }}</td>
  </tr>
</template>

<script setup>
const props = defineProps({ character: Object })
</script>

<style scoped>

</style>
