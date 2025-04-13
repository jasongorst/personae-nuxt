<template>
  <tr class="hover">
    <td
      v-for="field in fields"
      :key="field"
      class="p-0!"
    >
      <!--suppress HtmlUnknownTarget -->
      <NuxtLink
        v-if="isPresent(linkTemplate)"
        :to="link(row)"
        class="inline-block w-full px-3 py-2 xl:px-4 xl:py-3"
      >
        <span v-if="isPresent(row[field])">
          {{ row[field] }}
        </span>

        <span v-else>
          &nbsp;
        </span>
      </NuxtLink>

      <div
        v-else
        class="inline-block w-full px-3 py-2 xl:px-4 xl:py-3"
      >
        <span v-if="isPresent(row[field])">
          {{ row[field] }}
        </span>

        <span v-else>
          &nbsp;
        </span>
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
  linkTemplate: {
    type: String
  }
})

const link = computed(() => _template(props.linkTemplate, { interpolate: /{{([\s\S]+?)}}/g }))
</script>

<style scoped>

</style>
