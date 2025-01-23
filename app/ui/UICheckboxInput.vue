<template>
  <UIOldFormControl
    :class="[
      ...classListToArray(wrapperClass),
      { 'disabled-tooltip': (disabled && isPresent(disabledTooltip)) }
    ]"
    :data-tip="disabledTooltip"
    :label-for="id"
    :label-class="[...classListToArray(labelClass), 'cursor-pointer', { 'label-disabled': disabled }]"
    :error-label-class="errorLabelClass"
  >
    <UICheckboxField
      v-model="model"
      :class="{ 'checkbox-error': $slots.error }"
      :id="id"
      :size="size"
      :disabled="disabled"
      v-bind="$attrs"
    />

    <template #label>
      <slot name="label" />
    </template>

    <template #error v-if="$slots.error">
      <slot name="error" />
    </template>
  </UIOldFormControl>
</template>

<script setup>
defineOptions({
  // disable attribute fallthrough to root component
  //   (they're assigned to the UiCheckboxField with v-bind="$attrs")
  inheritAttrs: false
})

const model = defineModel()

const props = defineProps({
  // id of UiCheckboxField
  id: {
    type: String,
    default: () => uuid()
  },
  // size of UiCheckboxField (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return ["lg", "md", "sm", "xs"].includes(value)
    }
  },
  // class of UiFormControl
  wrapperClass: {
    type: [Array, String]
  },
  // class of label
  labelClass: {
    type: [Array, String],
    default: "text-secondary"
  },
  // class of error label
  errorLabelClass: {
    type: [Array, String],
    default: "text-error"
  },
  // disabled UiCheckboxField
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
