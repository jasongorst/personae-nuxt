<template>
  <UIFieldset
    :class="wrapperClass"
    :label-class="labelClass"
    :error-class="errorClass"
  >
    <div
      class="input w-full gap-0 pr-0"
      :class="[inputSize[props.size], $slots.error && 'input-error']"
    >
      <input
        v-model="password"
        :id="id"
        class="grow border-none focus:outline-none"
        @change="emit('change')"
        :type="inputType"
        v-bind="$attrs"
      />

      <button
        @click="toggleVisibility"
        class="btn btn-neutral h-full border-none focus:outline-none active:translate-0!
          [transition-property:color,background-color,box-shadow]"
        :class="[ buttonSize[size] ]"
        tabindex="-1"
        type="button"
      >
        <Icon
          :name="icon"
          size="1.25rem"
        />
      </button>
    </div>

    <template v-if="$slots.label" #label>
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
  "grow", "border-none", "focus:outline-none"
]

const inputClass = computed(() => twMerge(defaultClass, props.class))

const icon = computed(() => {
  if (isVisible.value) {
    return "ph:eye-slash-bold"
  } else {
    return "ph:eye-bold"
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
