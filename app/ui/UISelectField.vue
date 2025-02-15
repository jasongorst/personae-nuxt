<template>
  <select
    v-model="model"
    :id="id"
    :class="selectClass"
    :disabled="disabled"
    v-bind="selectAttrs"
  >
    <option
      v-for="(option, value) in optionsList"
      :key="option"
      :value="value"
    >
      {{ option }}
    </option>
  </select>
</template>

<script setup>
const model = defineModel()

const props = defineProps({
  // class of select element
  class: {
    type: [ Array, Object, String ],
    default: () => ""
  },
  // id of select
  id: {
    type: String,
    default: () => uuid()
  },
  // size of select (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return [ "xl", "lg", "md", "sm", "xs" ].includes(value)
    }
  },
  // array of options or object with { option: value } properties
  options: {
    type: [ Array, Object ],
    required: true
  },
  // disabled
  disabled: {
    type: Boolean,
    default: false
  }
})

const attrs = useAttrs()
const selectAttrs = computed(() => _omit(attrs, [ "class", "disabled", "id", "size" ]))

const selectSize = {
  xl: "select-xl",
  lg: "select-lg",
  md: "select-md",
  sm: "select-sm",
  xs: "select-xs"
}

const defaultClass = [ "select", "w-full", selectSize[props.size], props.disabled && "cursor-not-allowed" ]
const selectClass = computed(() => twMerge(defaultClass, props.class))

// normalize options prop to object with { option: value } properties
const optionsList = computed(() => {
  if (_isArray(props.options)) {
    return _fromPairs(_map(props.options, (option) => [option, option]))
  } else {
    return props.options
  }
})
</script>

<style scoped>

</style>
