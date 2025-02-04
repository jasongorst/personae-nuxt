<template>
  <button
    type="button"
  >
    <span class="flex flex-col">
      <span
        class="loading loading-spinner h-6 aspect-auto! w-full! mask-contain"
        :class="{ 'h-0!': !isLoading }"
      >
      </span>

      <span
        class="overflow-hidden"
        :class="{ 'h-0!': isLoading }"
      >
        <slot></slot>
      </span>
    </span>
  </button>
</template>

<script setup>
const props = defineProps([ "isLoading" ])
</script>

<style scoped>
.mask-contain {
  mask-size: contain;
}
</style>
