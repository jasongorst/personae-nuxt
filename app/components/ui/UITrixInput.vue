<template>
  <UIFormControl
    :class="wrapperClass"
    :label-for="id"
    :label-class="labelClass"
    :error-label-class="errorLabelClass"
  >
    <UITrixEditor
      v-model="model"
      :class="{ 'textarea-error': $slots.error }"
      :input-id="id"
      :input-name="`${id}_content`"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :config="config"
      v-bind="$attrs"
    />

    <template #label>
      <slot name="label" />
    </template>

    <template #error v-if="$slots.error">
      <slot name="error" />
    </template>
  </UIFormControl>
</template>

<script setup>
defineOptions({
  // disable attribute fallthrough to root component
  //   (they're assigned to the UiTrixEditor with v-bind="$attrs")
  inheritAttrs: false
})

const model = defineModel()

const props = defineProps({
  // id of hidden UiTrixEditor hidden input
  id: {
    type: String,
    default: () => uuid()
  },
  // class of UiFormControl
  wrapperClass: {
    type: [Array, String]
  },
  // class of label
  labelClass: {
    type: [Array, String],
    default: "text-secondary"
  },
  // class of error label
  errorLabelClass: {
    type: [Array, String],
    default: "text-error"
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
</script>

<style scoped>

</style>
