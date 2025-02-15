<template>
  <UIFieldset
    :class="wrapperClass"
    :disabled="disabled"
    :tooltip="tooltip"
    :label-class="labelClass"
    :error-class="errorClass"
  >
    <UISelectField
      v-model="model"
      :id="id"
      :class="selectFieldClass"
      :size="size"
      :options="options"
      :disabled="disabled"
      v-bind="selectFieldAttrs"
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
  // class merged with UISelectField
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
  // disable select
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
  },
  // options for UiSelectField
  options: {
    type: [ Array, Object ],
    required: true
  }
})

const attrs = useAttrs()
const slots = useSlots()

const selectFieldAttrs = computed(() => _omit(attrs, [ "class", "disabled", "id", "size" ]))

const defaultClass = [ slots.error && "select-error" ]
const selectFieldClass = computed(() => twMerge(defaultClass, props.class))
</script>

<style scoped>

</style>
