<template>
  <FormControl
    :class="wrapperClass"
    :label-for="id"
    :label-class="labelClass"
    :error-label-class="errorLabelClass"
  >
    <TrixEditor
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
  </FormControl>
</template>

<script setup>
defineOptions({
  // disable attribute fallthrough to root component
  //   (they're assigned to the TrixEditor with v-bind="$attrs")
  inheritAttrs: false
})

const model = defineModel()

const props = defineProps({
  // id of hidden TrixEditor hidden input
  id: {
    type: String,
    default: () => uuid()
  },
  // class of FormControl
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
