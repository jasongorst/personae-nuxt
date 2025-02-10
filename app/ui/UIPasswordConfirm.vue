<template>
  <div
    class="contents"
    :class="wrapperClass"
  >
    <UIPasswordInput
      v-model="password"
      @change="comparePasswords"
      :id="id"
      :size="size"
      :legend-class="legendClass"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      v-bind="$attrs"
    >
      <template #legend>
        <slot name="legend">
          Password
        </slot>
      </template>

      <template #error v-if="$slots.passwordError">
        <slot name="passwordError" />
      </template>
    </UIPasswordInput>

    <UIPasswordInput
      v-model="passwordConfirm"
      @change="comparePasswords"
      :id="`${id}_confirm`"
      :size="size"
      :legend-class="legendClass"
      :placeholder="confirmPlaceholder"
      :autocomplete="autocomplete"
      v-bind="$attrs"
    >
      <template #legend>
        <slot name="confirmLegend">
          Confirm Password
        </slot>
      </template>

      <template #error v-if="hasMismatchedPasswords">
        <slot name="confirmError">
          Passwords do not match.
        </slot>
      </template>
    </UIPasswordInput>
  </div>
</template>

<script setup>
defineOptions({
  // disable attribute fallthrough to root component
  //   (they're assigned to the <input> with v-bind="$attrs")
  inheritAttrs: false
})

const confirmedPassword = defineModel({ type: String })

const props = defineProps({
  // id of <input>
  id: {
    type: String,
    default: () => uuid()
  },
  // size of input (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return ["lg", "md", "sm", "xs"].includes(value)
    }
  },
  // class of outer div
  wrapperClass: {
    type: [Array, String]
  },
  // class of label.label
  legendClass: {
    type: [Array, String],
    default: "text-secondary"
  },
  // class of error span.label-text-alt
  errorClass: {
    type: [Array, String],
    default: "text-error"
  },
  // value of autocomplete attribute
  autocomplete: {
    type: String,
    default: "new-password"
  },
  placeholder: {
    type: String,
    default: "New password"
  },
  confirmPlaceholder: {
    type: String,
    default: "Confirm password"
  }
})

const emit = defineEmits(["hasMismatchError"])

const password = ref(null)
const passwordConfirm = ref(null)
const hasMismatchedPasswords = ref(false)

function comparePasswords() {
  if (isBlank(passwordConfirm.value)) {
    // reset if passwordConfirm is blank
    confirmedPassword.value = ""
    hasMismatchedPasswords.value = false
  } else if (password.value === passwordConfirm.value) {
    confirmedPassword.value = password.value
    hasMismatchedPasswords.value = false
  } else {
    confirmedPassword.value = ""
    hasMismatchedPasswords.value = true
    emit("hasMismatchError")
  }
}
</script>

<style scoped>

</style>
