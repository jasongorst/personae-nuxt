<template>
  <div class="sticky bottom-0 w-full -mt-4 toolbar">
    <div class="bg-primary text-primary-content p-4 flex flex-row justify-between text-sm">
      <div class="leading-6">
        {{ `${count} ${count > 1 ? name : pluralName}` }}
      </div>

      <!--suppress HtmlUnknownTarget -->
      <NuxtLink
        v-if="isPresent(createLink)"
        :to="createLink"
        class="justify-self-end btn btn-xs btn-secondary uppercase"
      >
        Add

        <Icon
          name="ph:plus-bold"
          size="0.85rem"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "row"
  },
  pluralName: {
    type: String,
    default: (rawProps) => isPresent(rawProps?.name) ? rawProps.name + "s" : "rows"
  },
  count: {
    type: Number,
    required: true
  },
  createLink: {
    type: String
  }
})
</script>

<style scoped>
@reference "~/assets/css/main.css";

@layer components {
  .toolbar {
    @apply before:block before:sticky before:bottom-20 before:w-full before:h-4 before:bg-gradient-to-t before:from-base-100;
    @apply after:block after:sticky after:bottom-0 after:w-full after:h-4 after:bg-base-100;
  }
}
</style>
