<template>
  <div class="form-control">
    <label
      v-if="$slots.label"
      :class="['label', 'label-text', ...classListToArray(labelClass)]"
      :for="labelFor"
    >
      <slot name="label" />
    </label>

    <slot />

    <label
      v-if="$slots.error"
      class="label"
    >
      <span
        :class="errorLabelClass"
        class="label-text-alt"
      >
        <slot name="error" />
      </span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  labelFor: {
    type: String
  },
  labelClass: {
    type: [ Array, String ],
    default: "text-secondary"
  },
  errorLabelClass: {
    type: [ Array, String ],
    default: "text-error"
  }
})
</script>

<style scoped>

</style>
