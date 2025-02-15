<template>
  <UIFieldset
    :class="wrapperClass"
    :disabled="disabled"
    :tooltip="tooltip"
    :label-class="labelClass"
    :error-class="errorClass"
  >
    <UIToggleField
      v-model="model"
      :id="id"
      :class="toggleFieldClass"
      :size="size"
      :disabled="disabled"
      v-bind="toggleFieldAttrs"
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

const model = defineModel()

const props = defineProps({
  // class merged with UIToggleField
  class: {
    type: [ Array, Object, String ],
    default: () => ""
  },
  // id of input
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
  // disable input
  disabled: {
    type: Boolean,
    default: false
  },
  // class of fieldset
  wrapperClass: {
    type: [Array, String]
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

const toggleFieldAttrs = computed(() => _omit(attrs, [ "class", "disabled", "id", "size" ]))

const defaultClass = [ slots.error && "toggle-error" ]
const toggleFieldClass = computed(() => twMerge(defaultClass, props.class))
</script>

<style scoped>

</style>
