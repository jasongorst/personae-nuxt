<template>
  <fieldset
    :class="fieldsetClass"
    :data-tip="tooltip"
  >
    <legend
      v-if="$slots.legend"
      :class="legendClass"
    >
      <slot name="legend" />
    </legend>

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
  </fieldset>
</template>

<script setup>
defineOptions({
  // disable attribute fallthrough to root component
  inheritAttrs: false
})

const props = defineProps({
  // class of fieldset element
  class: {
    type: [ Array, Object, String ],
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
  // class of legend
  legendClass: {
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
  fieldset: [ "fieldset", isPresent(props.tooltip) && "fieldset-tooltip" ],
  legend: [ "fieldset-legend", "text-secondary", "text-sm", props.disabled && "legend-disabled" ],
  error: [ "fieldset-label", "text-error", "text-xs" ]
}

const fieldsetClass = computed(() => twMerge(defaultClass.fieldset, props.class))
const legendClass = computed(() => twMerge(defaultClass.legend, props.legendClass))
const errorClass = computed(() => twMerge(defaultClass.error, props.errorClass))
</script>

<style scoped>
@reference "~/assets/css/main.css";

@layer components {
  .fieldset-tooltip {
    @apply tooltip tooltip-info tooltip-bottom tooltip-late;
  }

  .legend-disabled {
    @apply text-base-content/40 cursor-not-allowed;
  }
}
</style>
