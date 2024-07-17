<template>
  <input
    v-model="model"
    :id="id"
    :type="type"
    :class="['input', 'input-bordered', inputSize[size], { 'cursor-not-allowed': disabled }]"
    :list="isPresent(datalist) ? `${id}_list` : null"
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
</template>

<script setup>
const model = defineModel()

const props = defineProps({
  // id of input
  id: {
    type: String,
    default: () => uuid()
  },
  // type of input
  type: {
    type: String,
    default: "text",
    validator(value) {
      return ["email", "text"].includes(value)
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
  // array of option values for datalist
  datalist: {
    type: Array,
    default: []
  },
  // disabled
  disabled: {
    type: Boolean,
    default: false
  }
})

const inputSize = {
  lg: "input-lg",
  md: "input-md",
  sm: "input-sm",
  xs: "input-xs"
}
</script>

<style scoped>

</style>
