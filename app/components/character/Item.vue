<template>
  <tr class="hover:bg-base-300!">
    <td
      v-for="attribute of listAttributes"
      :key="`${character.id}_${attribute}`"
      class="p-0!"
    >
      <NuxtLink
        :to="`/show-${character.id}`"
        class="inline-block w-full px-3 py-2 xl:px-4 xl:py-3"
      >
        {{ character[attribute] || '&nbsp;' }}
      </NuxtLink>
    </td>
  </tr>
</template>

<script setup>
defineProps([ "character" ])
</script>

<style scoped>

</style>
