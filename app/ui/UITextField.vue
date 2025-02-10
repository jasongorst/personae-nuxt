<template>
  <input
    v-model="model"
    :id="id"
    :class="inputClass"
    :disabled="disabled"
    :list="isPresent(datalist) ? datalistId : null"
    :type="type"
    v-bind="inputAttrs"
  />

  <datalist
    v-if="isPresent(datalist)"
    :id="datalistId"
  >
    <option
      v-for="option in datalist"
      :key="option"
      :value="option"
    >
      {{ option }}
    </option>
  </datalist>
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
  // type of input
  type: {
    type: String,
    default: "text",
    validator(value) {
      return [ "email", "text" ].includes(value)
    }
  },
  // size of input (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return [ "xl", "lg", "md", "sm", "xs" ].includes(value)
    }
  },
  // array of option values for datalist
  datalist: {
    type: Array,
    default: []
  },
  // disabled input
  disabled: {
    type: Boolean,
    default: false
  }
})

const attrs = useAttrs()
const inputAttrs = computed(() => _omit(attrs, [ "class", "disabled", "id", "type", "list", "size" ]))

const datalistId = computed(() => `${props.id}_list`)

const inputSize = {
  xl: "input-xl",
  lg: "input-lg",
  md: "input-md",
  sm: "input-sm",
  xs: "input-xs"
}

const defaultClass = [ "input", "w-full", inputSize[props.size], props.disabled && "cursor-not-allowed" ]
const inputClass = computed(() => twMerge(defaultClass, props.class))
</script>

<style scoped>

</style>
