<template>
  <FormControl
    :class="formControlClass"
    :data-tip="disabledTooltip"
    :label-for="id"
    :label-class="computedLabelClass"
    :error-label-class="errorLabelClass"
  >
    <input
      v-model="model"
      :id="id"
      :type="type"
      :class="[...inputClass, { [inputErrorClass]: $slots.error }]"
      :list="`${id}_list`"
      :disabled="disabled"
      v-bind="$attrs"
    />

    <datalist
      v-if="isPresent(datalist)"
      :id="`${id}_list`"
    >
      <option
        v-for="option in datalist"
        :key="option"
        :value="option"
      >
      </option>
    </datalist>

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
  // id of <input>
  id: {
    type: String,
    default: () => uuid()
  },
  // type of <input>
  type: {
    type: String,
    default: "text",
    validator(value) {
      return ["checkbox", "email", "text"].includes(value)
    }
  },
  // size of input (daisyui sizes)
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
  // array of <option> values for <datalist>
  datalist: {
    type: Array,
    default: []
  },
  // class of error span.label-text-alt
  errorLabelClass: {
    type: [Array, String],
    default: "text-error"
  },
  // disabled input
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

const checkboxSize = {
  lg: "checkbox-lg",
  md: "checkbox-md",
  sm: "checkbox-sm",
  xs: "checkbox-xs"
}

const inputSize = {
  lg: "input-lg",
  md: "input-md",
  sm: "input-sm",
  xs: "input-xs"
}

const inputClass = computed(() => {
  const result = []

  if (props.type === "checkbox") {
    result.push("checkbox", checkboxSize[props.size])
  } else {
    result.push("input", "input-bordered", inputSize[props.size])
  }

  if (props.disabled) {
    result.push("cursor-not-allowed")
  }

  return result
})

const inputErrorClass = computed(() => {
  if (props.type === "checkbox") {
    return "checkbox-error"
  } else {
    return "input-error"
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
