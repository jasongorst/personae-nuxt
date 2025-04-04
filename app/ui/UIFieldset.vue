<template>
  <div
    :class="fieldsetClass"
    :data-tip="tooltip"
  >
    <label
      v-if="$slots.label"
      :class="labelClass"
      for="id"
    >
      <slot name="label" />
    </label>

    <slot
      :id="id"
      :disabled="disabled"
      v-bind="slotAttrs"
    />

    <p
      v-if="$slots.error"
      :class="errorClass"
    >
      <slot name="error" />
    </p>
  </div>
</template>

<script setup>
defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  // class of fieldset element
  class: {
    type: [ Array, String ],
    default: () => ""
  },
  // id for child component
  id: {
    type: String,
    default: () => uuid()
  },
  // disabled child component
  disabled: {
    type: Boolean,
    default: false
  },
  // tooltip content
  tooltip: {
    type: String,
    default: null
  },
  // class of label
  labelClass: {
    type: [ Array, String ],
    default: () => ""
  },
  // class of error
  errorClass: {
    type: [ Array, String ],
    default: () => ""
  }
})

const attrs = useAttrs()
const slotAttrs = computed(() => _omit(attrs, [ "class", "disabled", "id" ]))

const defaultClass = {
  fieldset: [ "fieldset", "pt-2", "first-of-type:pt-0", "pb-0", isPresent(props.tooltip) && "fieldset-tooltip" ],
  label: [ "fieldset-legend", "text-secondary", "text-sm", "py-0", props.disabled && "label-disabled" ],
  error: [ "fieldset-label", "text-error", "text-xs" ]
}

const fieldsetClass = computed(() => twMerge(defaultClass.fieldset, props.class))
const labelClass = computed(() => twMerge(defaultClass.label, props.labelClass))
const errorClass = computed(() => twMerge(defaultClass.error, props.errorClass))
</script>

<style scoped>
@reference "~/assets/css/main.css";

@layer components {
  .fieldset-tooltip {
    @apply tooltip tooltip-info tooltip-bottom tooltip-late;
  }

  .label-disabled {
    @apply text-base-content/40 cursor-not-allowed;
  }
}
</style>
