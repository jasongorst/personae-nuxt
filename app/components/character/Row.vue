<template>
  <tr
    class="hover:bg-base-300!"
    :data-testid="`row_${character.id}`"
  >
    <td
      v-for="attribute in listAttributes"
      :key="`${character.id}_${attribute}`"
      class="p-0! whitespace-nowrap"
      :data-testid="`${attribute}_${_kebabCase(character[attribute])}`"
    >
      <!--suppress HtmlUnknownTarget -->
      <NuxtLink
        :to="`/show-${character.id}`"
        class="inline-block w-full px-3 py-2 xl:px-4 xl:py-3"
      >
        {{ isPresent(character[attribute]) ? character[attribute] : "&nbsp;" }}
      </NuxtLink>
    </td>
  </tr>
</template>

<script setup>
defineProps([ "character" ])
</script>

<style scoped>

</style>
