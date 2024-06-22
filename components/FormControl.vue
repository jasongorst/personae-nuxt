<template>
  <div class="form-control">
    <label
      :for="labelFor"
      class="label label-text"
      :class="labelClass"
    >
      {{ label }}
    </label>

    <slot />

    <label
      v-if="isPresent(error)"
      class="label"
    >
      <span
        class="label-text-alt"
        :class="errorLabelClass"
      >
        {{ error }}
      </span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String
  },
  labelFor: {
    type: String
  },
  labelClass: {
    type: [Array, String],
    default: "text-secondary"
  },
  error: {
    type: String,
    default: ""
  },
  errorLabelClass: {
    type: [Array, String],
    default: "text-error"
  }
})
</script>

<style scoped>

</style>
