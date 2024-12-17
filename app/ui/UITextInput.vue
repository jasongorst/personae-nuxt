<template>
  <UIFormControl
    :class="[
      ...classListToArray(wrapperClass),
      { 'disabled-tooltip': (disabled && isPresent(disabledTooltip)) }
    ]"
    :data-tip="disabledTooltip"
    :error-label-class="errorLabelClass"
    :label-class="[ ...classListToArray(labelClass), { 'label-disabled': disabled } ]"
    :label-for="id"
  >
    <UITextField
      :id="id"
      v-model="model"
      :class="{ 'input-error': $slots.error }"
      :datalist="datalist"
      :disabled="disabled"
      :size="size"
      :type="type"
      v-bind="$attrs"
    />

    <template #label>
      <slot name="label" />
    </template>

    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
  </UIFormControl>
</template>

<script setup>
defineOptions({
  // disable attribute fallthrough to root component
  //   (they're assigned to the UITextField.vue with v-bind="$attrs")
  inheritAttrs: false
})

const model = defineModel()

const props = defineProps({
  // id of UITextField.vue
  id: {
    type: String,
    default: () => uuid()
  },
  // type of UITextField.vue input
  type: {
    type: String,
    default: "text",
    validator(value) {
      return [ "email", "text" ].includes(value)
    }
  },
  // size of UITextField.vue (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return [ "lg", "md", "sm", "xs" ].includes(value)
    }
  },
  // class of UiFormControl
  wrapperClass: {
    type: [ Array, String ],
    default: ""
  },
  // class of label
  labelClass: {
    type: [ Array, String ],
    default: "text-secondary"
  },
  // array of option values for datalist
  datalist: {
    type: Array,
    default: []
  },
  // class of error label
  errorLabelClass: {
    type: [ Array, String ],
    default: "text-error"
  },
  // disabled UITextField.vue
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
