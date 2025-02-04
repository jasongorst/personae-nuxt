<template>
  <tr class="hover">
    <td
      v-for="attribute of listAttributes"
      :key="attribute"
      class="p-0!"
    >
      <NuxtLink
        :to="`/show-${character.id}`"
        class="inline-block w-full px-3 py-2 xl:px-4 xl:py-3"
        v-html="character[attribute] || '&nbsp;'"
      ></NuxtLink>
    </td>
  </tr>
</template>

<script setup>
defineProps(["character"])
</script>

<style scoped>

</style>
