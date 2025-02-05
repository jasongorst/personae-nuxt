<template>
  <UIFieldset
    :class="wrapperClass"
    :legend-class="legendClass"
    :error-class="errorClass"
  >
    <div
      class="join gap-0 group border-solid border-(--color-base-content)/20 border-(length:--border)
        rounded-(--radius-field) focus-within:border-(--color-base-content) focus-within:outline-2
        focus-within:outline-solid focus-within:outline-offset-2 focus-within:outline-(--color-base-content)
      "
      :class="[
        $slots.error && 'border-(--color-error)', $slots.error && 'focus-within:border-(--color-error)',
        $slots.error && 'focus-within:outline-(--color-error)'
      ]"
    >
      <input
        v-model="password"
        :id="id"
        :class="inputClass"
        @change="emit('change')"
        :type="inputType"
        v-bind="$attrs"
      />

      <button
        @click="toggleVisibility"
        class="join-item btn btn-neutral active:translate-0! border-none focus:outline-none
          [transition-property:color,background-color,box-shadow]"
        :class="[ buttonSize[size] ]"
        tabindex="-1"
        type="button"
      >
        <Icon
          :name="icon"
          class="w-5!"
        />
      </button>
    </div>

    <template v-if="$slots.legend" #legend>
      <slot name="legend" />
    </template>

    <template #error v-if="$slots.error">
      <slot name="error" />
    </template>
  </UIFieldset>
</template>

<script setup>
defineOptions({
  // disable attribute fallthrough to root component
  inheritAttrs: false
})

const password = defineModel({ type: String })

const props = defineProps({
  // class merged with input
  class: {
    type: [ Array, Object, String ],
    default: () => ""
  },
  // id of input
  id: {
    type: String,
    default: () => uuid()
  },
  // password text visible
  visible: {
    type: Boolean,
    default: false
  },
  // size of input (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return [ "xl", "lg", "md", "sm", "xs" ].includes(value)
    }
  },
  // class of fieldset
  wrapperClass: {
    type: [ Array, String ],
    default: () => ""
  },
  // class for legend
  legendClass: {
    type: [ Array, String ],
    default: () => ""
  },
  // class for error
  errorClass: {
    type: [ Array, String ],
    default: () => ""
  }
})

const emit = defineEmits(["change"])

const attrs = useAttrs()
const slots = useSlots()

const inputAttrs = computed(() => _omit(attrs, [ "class", "disabled", "id", "type", "list", "size" ]))

const isVisible = ref(props.visible)

const inputSize = {
  xl: "input-xl",
  lg: "input-lg",
  md: "input-md",
  sm: "input-sm",
  xs: "input-xs"
}

const buttonSize = {
  xl: "btn-xl",
  lg: "btn-lg",
  md: "btn-md",
  sm: "btn-sm",
  xs: "btn-xs"
}

const defaultClass = [
  "input", inputSize[props.size], "grow", "join-item", "border-none", "focus:outline-none", slots.error && "input-error"
]

const inputClass = computed(() => twMerge(defaultClass, props.class))

const icon = computed(() => {
  if (isVisible.value) {
    return "fa6-regular:eye-slash"
  } else {
    return "fa6-regular:eye"
  }
})

const inputType = computed(() => {
  if (isVisible.value) {
    return "text"
  } else {
    return "password"
  }
})

function toggleVisibility() {
  isVisible.value = !isVisible.value
}
</script>

<style scoped>

</style>
