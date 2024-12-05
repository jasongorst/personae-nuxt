<template>
  <UIFormControl
    :class="wrapperClass"
    :label-for="id"
    :label-class="labelClass"
    :error-label-class="errorLabelClass"
  >
    <div
      class="join gap-0 focus-within:outline-base-content/20 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2"
      :class="[{ 'focus:!outline-error': $slots.error, 'focus-within:!outline-error': $slots.error }]"
    >
      <input
        v-model="password"
        class="input input-bordered grow border-r-0 rounded-r-none focus:!outline-none focus-within:!outline-none"
        :class="[inputSize[props.size], { 'input-error': $slots.error }]"
        :id="id"
        @change="emit('change')"
        :type="inputType"
        v-bind="$attrs"
      />

      <button
        @click="toggleVisibility"
        class="btn join-item btn-neutral rounded-r-sm border-base-content/20 hover:border-base-content/20 !border-l-0 focus:!outline-none"
        :class="[buttonSize[size], { '!border-error': $slots.error }]"
        tabindex="-1"
        type="button"
      >
        <Icon :name="icon" />
      </button>
    </div>

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
  //   (they're assigned to the <input> with v-bind="$attrs")
  inheritAttrs: false
})

const password = defineModel({ type: String })

const props = defineProps({
  // id of <input>
  id: {
    type: String,
    default: () => uuid()
  },
  // password text visible on load
  startsVisible: {
    type: Boolean,
    default: false
  },
  // size of input (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return ["lg", "md", "sm", "xs"].includes(value)
    }
  },
  // class of div.form-control
  wrapperClass: {
    type: [Array, String]
  },
  // class of label.label
  labelClass: {
    type: [Array, String],
    default: "text-secondary"
  },
  // class of error span.label-text-alt
  errorLabelClass: {
    type: [Array, String],
    default: "text-error"
  }
})

const emit = defineEmits(["change"])

const isVisible = ref(props.startsVisible)

const inputSize = {
  lg: "input-lg",
  md: "input-md",
  sm: "input-sm",
  xs: "input-xs"
}

const buttonSize = {
  lg: "btn-lg",
  md: "btn-md",
  sm: "btn-sm",
  xs: "btn-xs"
}

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
