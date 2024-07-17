<template>
  <FormControl
    :class="[
      ...classListToArray(wrapperClass),
      { 'disabled-tooltip': (disabled && isPresent(disabledTooltip)) }
    ]"
    :data-tip="disabledTooltip"
    :label-for="id"
    :label-class="[...classListToArray(labelClass), { 'label-disabled': disabled }]"
    :error-label-class="errorLabelClass"
  >
    <TextField
      v-model="model"
      :class="{ 'input-error': $slots.error }"
      :id="id"
      :type="type"
      :size="size"
      :datalist="datalist"
      :disabled="disabled"
      v-bind="$attrs"
    />

    <template #label>
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
  //   (they're assigned to the TextField with v-bind="$attrs")
  inheritAttrs: false
})

const model = defineModel()

const props = defineProps({
  // id of TextField
  id: {
    type: String,
    default: () => uuid()
  },
  // type of TextField input
  type: {
    type: String,
    default: "text",
    validator(value) {
      return ["email", "text"].includes(value)
    }
  },
  // size of TextField (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return ["lg", "md", "sm", "xs"].includes(value)
    }
  },
  // class of FormControl
  wrapperClass: {
    type: [Array, String],
    default: ""
  },
  // class of label
  labelClass: {
    type: [Array, String],
    default: "text-secondary"
  },
  // array of option values for datalist
  datalist: {
    type: Array,
    default: []
  },
  // class of error label
  errorLabelClass: {
    type: [Array, String],
    default: "text-error"
  },
  // disabled TextField
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
