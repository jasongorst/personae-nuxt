<template>
  <input
    v-model="model"
    :id="id"
    :class="inputClass"
    :disabled="disabled"
    type="checkbox"
    v-bind="inputAttrs"
  />
</template>

<script setup>
const model = defineModel()

const props = defineProps({
  // class of input element
  class: {
    type: [ Array, Object, String ],
    default: () => ""
  },
  // id of input element
  id: {
    type: String,
    default: () => uuid()
  },
  // size of input (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return [ "xl", "lg", "md", "sm", "xs" ].includes(value)
    }
  },
  // disabled
  disabled: {
    type: Boolean,
    default: false
  }
})

const attrs = useAttrs()
const inputAttrs = computed(() => _omit(attrs, [ "class", "disabled", "id", "size" ]))

const checkboxSize = {
  xl: "checkbox-xl",
  lg: "checkbox-lg",
  md: "checkbox-md",
  sm: "checkbox-sm",
  xs: "checkbox-xs"
}

const defaultClass = [ "checkbox", checkboxSize[props.size], props.disabled && "cursor-not-allowed" ]
const inputClass = computed(() => twMerge(defaultClass, props.class))
</script>

<style scoped>

</style>
