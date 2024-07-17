<template>
  <input
    v-model="model"
    :id="id"
    type="checkbox"
    :class="['checkbox', checkboxSize[size], { 'cursor-not-allowed': disabled }]"
    :disabled="disabled"
    v-bind="$attrs"
  />
</template>

<script setup>
const model = defineModel()

const props = defineProps({
  // id of <input>
  id: {
    type: String,
    default: () => uuid()
  },
  // size of input (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return ["lg", "md", "sm", "xs"].includes(value)
    }
  },
  // disabled
  disabled: {
    type: Boolean,
    default: false
  }
})

const checkboxSize = {
  lg: "checkbox-lg",
  md: "checkbox-md",
  sm: "checkbox-sm",
  xs: "checkbox-xs"
}
</script>

<style scoped>

</style>
