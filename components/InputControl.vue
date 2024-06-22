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
      :id="id"
      :class="inputClass"
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
  // disable attribute fallthrough
  inheritAttrs: false
})

const model = defineModel()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "text",
    validator(value) {
      return ["checkbox", "email", "text"].includes(value)
    }
  },
  size: {
    type: String,
    default: "md",
    validator(value) {
      return ["lg", "md", "sm", "xs"].includes(value)
    }
  },
  wrapperClass: {
    type: [Array, String]
  },
  label: {
    type: String
  },
  labelClass: {
    type: [Array, String],
    default: "text-secondary"
  },
  datalist: {
    type: Array,
    default: []
  },
  error: {
    type: String,
    default: ""
  },
  errorLabelClass: {
    type: [Array, String],
    default: "text-error"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disabledTooltip: {
    type: String,
    default: ""
  }
})

const disabledClass = ["tooltip", "tooltip-info", "tooltip-bottom", "tooltip-late"]

const inputClass = computed(() => {
  let result = []

  switch (props.type) {
    case "checkbox":
      result.push("checkbox", `checkbox-${props.size}`)

      if (props.disabled) {
        result.push("cursor-not-allowed")
      } else {
        result.push("cursor-pointer")
      }

      if (isPresent(props.error)) {
        result.push("checkbox-error")
      }

      break

    case "email":
    case "text":
    default:
      result.push("input", "input-bordered", `input-${props.size}`)

      if (isPresent(props.error)) {
        result.push("input-error")
      }
  }

  return result
})

const computedLabelClass = computed(() => {
  let result = classToArray(props.labelClass)

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

function classToArray(className) {
  if (_isString(className)) {
    return className.split(" ")
  } else {
    return className
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

.hello-tree-shaker {
  @apply input input-bordered input-error input-lg input-md input-sm input-xs;
  @apply checkbox checkbox-error checkbox-lg checkbox-md checkbox-sm checkbox-xs;
  @apply cursor-pointer cursor-not-allowed;
}
</style>
