<template>
  <FormControl
    :class="[
      ...classListToArray(wrapperClass),
      { 'disabled-tooltip': (disabled && isPresent(disabledTooltip)) }
    ]"
    :data-tip="disabledTooltip"
    :labelFor="id"
    :label-class="[...classListToArray(labelClass), { 'label-disabled': disabled }]"
    :error-label-class="errorLabelClass"
  >
    <SelectField
      v-model="model"
      :class="{ 'select-error': $slots.error }"
      :id="id"
      :size="size"
      :options="options"
      :disabled="disabled"
      v-bind="$attrs"
    />

    <template #label v-if="$slots.label">
      <slot name="label" />
    </template>

    <template #error v-if="$slots.error">
      <slot name="error" />
    </template>
  </FormControl>
</template>

<script setup>
defineOptions({
  // disable attribute fallthrough to root component
  //   (they're assigned to the SelectField with v-bind="$attrs")
  inheritAttrs: false
})

const model = defineModel()

const props = defineProps({
  // id of <select>
  id: {
    type: String,
    default: () => uuid()
  },
  // size of select (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return ["lg", "md", "sm", "xs"].includes(value)
    }
  },
  // class of FormControl
  wrapperClass: {
    type: [Array, String]
  },
  // class of label
  labelClass: {
    type: [Array, String],
    default: "text-secondary"
  },
  // options for SelectField
  options: {
    type: [Array, Object],
    required: true
  },
  // class of error label
  errorLabelClass: {
    type: [Array, String],
    default: "text-error"
  },
  // disabled SelectField
  disabled: {
    type: Boolean,
    default: false
  },
  // tooltip content for data-tip attribute
  disabledTooltip: {
    type: String,
    default: ""
  }
})
</script>

<style>
.disabled-tooltip {
  @apply tooltip tooltip-info tooltip-bottom tooltip-late;
}

.label-disabled {
  @apply text-base-content/40 cursor-not-allowed;
}

.tooltip-late:hover:before,
.tooltip-late:hover:after {
  @apply delay-500;
}
</style>
