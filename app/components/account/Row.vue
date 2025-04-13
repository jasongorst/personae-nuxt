<template>
  <tr class="hover">
    <td
      v-for="attribute in accountAttributes"
      :key="attribute"
      class="p-0!"
    >
      <!--suppress HtmlUnknownTarget -->
      <NuxtLink
        :to="`/dashboard/account/edit-${account?.id}`"
        class="inline-block w-full px-3 py-2 xl:px-4 xl:py-3"
      >
        <span v-if="isPresent(account[attribute])">
          {{ account[attribute] }}
        </span>

        <span v-else>
          &nbsp;
        </span>
      </NuxtLink>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  account: {
    type: Object
  },
  accountAttributes: {
    type: Array
  }
})
</script>

<style scoped>

</style>
