<template>
  <UIFieldset
    :class="wrapperClass"
    :label-class="labelClass"
    :error-class="errorClass"
  >
    <UITrixEditor
      v-model="model"
      :class="trixEditorClass"
      :id="id"
      :name="`${id}_content`"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :config="config"
      v-bind="trixEditorAttrs"
    />

    <template #label>
      <slot name="label" />
    </template>

    <template #error v-if="$slots.error">
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
  // class merged with UITrixEditor
  class: {
    type: [ Array, String ],
    default: () => ""
  },
  // id of hidden input
  id: {
    type: String,
    default: () => uuid()
  },
  // class of fieldset
  wrapperClass: {
    type: [ Array, String ],
    default: () => ""
  },
  // class for label
  labelClass: {
    type: [Array, String],
    default: ""
  },
  // class for error
  errorClass: {
    type: [ Array, String ],
    default: () => ""
  },
  // editor placeholder content
  placeholder: {
    type: String,
    required: false,
    default: ""
  },
  // focus editor when attached?
  autofocus: {
    type: Boolean,
    required: false,
    default: false
  },
  // override default Trix config
  config: {
    type: Object,
    required: false,
    default: () => {}
  }
})

const attrs = useAttrs()
const slots = useSlots()

const trixEditorAttrs = computed(() => _omit(attrs, [ "class", "id" ]))

const defaultClass = [ slots.error && "textarea-error" ]
const trixEditorClass = computed(() => twMerge(defaultClass, props.class))
</script>

<style scoped>

</style>
