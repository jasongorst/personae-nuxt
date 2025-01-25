<template>
  <div
    :class="[
      'form-control',
      { 'form-control-tooltip': isPresent(tooltip) }
    ]"
    :data-tip="tooltip"
  >
    <label
      v-if="$slots.label"
      :class="[
        'label',
        'label-text',
        ...classListToArray(labelClass),
        { 'label-disabled': disabled }
      ]"
      :for="id"
    >
      <slot name="label" />
    </label>

    <slot
      :id="id"
      :disabled="disabled"
    />

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
  // id for child component
  id: {
    type: String,
    default: () => uuid()
  },
  // disabled child component
  disabled: {
    type: Boolean,
    default: false
  },
  // tooltip content
  tooltip: {
    type: String,
    default: ""
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

<style scoped>@reference "~/assets/css/main.css";

@layer components {
  .form-control-tooltip {
    @apply tooltip tooltip-info tooltip-bottom tooltip-late;
  }

  .label-disabled {
    @apply text-base-content/40 cursor-not-allowed;
  }

  .tooltip-late:hover:before,
  .tooltip-late:hover:after {
    @apply delay-500;
  }
}
</style>
