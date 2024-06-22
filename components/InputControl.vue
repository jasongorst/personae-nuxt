<template>
  <FormControl
    :class="formControlClass"
    :data-tip="disabledTooltip"
    :label="label"
    :labelFor="id"
    :label-class="computedLabelClass"
    :error="error"
    :error-label-class="errorLabelClass"
  >
    <input
      v-model="model"
      :type="type"
      :class="inputClass"
      :id="id"
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
    required: true
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
  // content of <label>
  label: {
    type: String
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
  // content of error message
  error: {
    type: String,
    default: ""
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

  switch (props.type) {
    case "checkbox":
      result.push("checkbox", checkboxSize[props.size])

      if (isPresent(props.error)) {
        result.push("checkbox-error")
      }

      break

    case "email":
    case "text":
    default:
      result.push("input", "input-bordered", inputSize[props.size])

      if (isPresent(props.error)) {
        result.push("input-error")
      }
  }

  if (props.disabled) {
    result.push("cursor-not-allowed")
  }

  return result
})

const computedLabelClass = computed(() => {
  let result = castClassListToArray(props.labelClass)

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

function castClassListToArray(classList) {
  if (_isString(classList)) {
    return classList.split(" ")
  } else if (_isArray(classList)) {
    return classList
  } else {
    console.error(`can't cast ${classList} as an array of class names`)

    throw TypeError(`can't cast ${classList} as an array of class names`)
  }
}
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
