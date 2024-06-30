<template>
  <FormControl
    :class="formControlClass"
    :data-tip="disabledTooltip"
    :labelFor="id"
    :label-class="computedLabelClass"
    :error-label-class="errorLabelClass"
  >
    <select
      v-model="model"
      :id="id"
      :class="['select', 'select-bordered', selectSize[size], { 'select-error':  $slots.error }]"
      :disabled="disabled"
      v-bind="$attrs"
    >
      <option
        v-for="(option, value) in optionsList"
        :key="option"
        :value="value"
      >
        {{ option }}
      </option>
    </select>

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
  //   (they're assigned to the <input> with v-bind="$attrs")
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
  // class of div.form-control
  wrapperClass: {
    type: [Array, String]
  },
  // class of label.label
  labelClass: {
    type: [Array, String],
    default: "text-secondary"
  },
  // <option> values for <select>
  options: {
    type: [Array, Object],
    required: true
  },
  // class of error span.label-text-alt
  errorLabelClass: {
    type: [Array, String],
    default: "text-error"
  },
  // disabled select
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

const disabledClass = ["tooltip", "tooltip-info", "tooltip-bottom", "tooltip-late"]

const selectSize = {
  lg: "select-lg",
  md: "select-md",
  sm: "select-sm",
  xs: "select-xs"
}

const optionsList = computed(() => {
  if (_isArray(props.options)) {
    return _fromPairs(props.options.map((option) => [option, option]))
  } else {
    return props.options
  }
})

const computedLabelClass = computed(() => {
  let result = classListToArray(props.labelClass)

  if (props.disabled) {
    result.push("label-disabled", "cursor-not-allowed")
  } else {
    result.push("cursor-pointer")
  }

  return result
})

const formControlClass = computed(() => {
  if (props.disabled) {
    return mergeClasses(props.wrapperClass, disabledClass)
  } else {
    return props.wrapperClass
  }
})
</script>

<style>
.label-disabled {
  @apply text-base-content/40;
}

.tooltip-late:hover:before,
.tooltip-late:hover:after {
  @apply delay-500;
}
</style>
