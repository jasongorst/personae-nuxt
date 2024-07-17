<template>
  <select
    v-model="model"
    :id="id"
    :class="['select', 'select-bordered', selectSize[size], { 'cursor-not-allowed': disabled }]"
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
</template>

<script setup>
const model = defineModel()

const props = defineProps({
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
      return ["lg", "md", "sm", "xs"].includes(value)
    }
  },
  // array of options or object with { option: value } properties
  options: {
    type: [Array, Object],
    required: true
  },
  // disabled
  disabled: {
    type: Boolean,
    default: false
  }
})

const selectSize = {
  lg: "select-lg",
  md: "select-md",
  sm: "select-sm",
  xs: "select-xs"
}

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
