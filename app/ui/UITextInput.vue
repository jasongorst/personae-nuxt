<template>
  <UIFieldset
    :class="wrapperClass"
    :disabled="disabled"
    :tooltip="tooltip"
    :label-class="labelClass"
    :error-class="errorClass"
  >
    <UITextField
      v-model="model"
      :id="id"
      :class="textFieldClass"
      :datalist="datalist"
      :size="size"
      :type="type"
      :disabled="disabled"
      v-bind="textFieldAttrs"
    />

    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>

    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
  </UIFieldset>
</template>

<script setup>
defineOptions({
  inheritAttrs: false
})

const model = defineModel({ type: String })

const props = defineProps({
  // class merged with UITextField
  class: {
    type: [ Array, String ],
    default: () => ""
  },
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
      return [ "email", "text" ].includes(value)
    }
  },
  // size of input (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return uiSizes.includes(value)
    }
  },
  // array of option values for datalist
  datalist: {
    type: Array,
    default: []
  },
  // disable input
  disabled: {
    type: Boolean,
    default: false
  },
  // class of fieldset
  wrapperClass: {
    type: [ Array, String ],
    default: () => ""
  },
  // tooltip content
  tooltip: {
    type: String,
    default: null
  },
  // class for label
  labelClass: {
    type: [ Array, String ],
    default: () => ""
  },
  // class for error
  errorClass: {
    type: [ Array, String ],
    default: () => ""
  }
})

const attrs = useAttrs()
const slots = useSlots()

const textFieldAttrs = computed(() => _omit(attrs, [ "class", "disabled", "id", "type", "list", "size" ]))

const defaultClass = [ slots.error && "input-error" ]
const textFieldClass = computed(() => twMerge(defaultClass, props.class))
</script>

<style scoped>

</style>
