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
      :label-class="labelClass"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      v-bind="$attrs"
    >
      <template #label>
        <slot name="label">
          Password
        </slot>
      </template>

      <template #error v-if="$slots.passwordError">
        <slot name="passwordError" />
      </template>
    </UIPasswordInput>

    <UIPasswordInput
      v-model="UIPasswordConfirm"
      @change="comparePasswords"
      :id="`${id}_confirm`"
      :size="size"
      :label-class="labelClass"
      :placeholder="confirmPlaceholder"
      :autocomplete="autocomplete"
      v-bind="$attrs"
    >
      <template #label>
        <slot name="confirmLabel">
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
  labelClass: {
    type: [Array, String],
    default: "text-secondary"
  },
  // class of error span.label-text-alt
  errorLabelClass: {
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
const UIPasswordConfirm = ref(null)
const hasMismatchedPasswords = ref(false)

function comparePasswords() {
  if (isBlank(UIPasswordConfirm.value)) {
    // reset if UIPasswordConfirm is blank
    confirmedPassword.value = ""
    hasMismatchedPasswords.value = false
  } else if (password.value === UIPasswordConfirm.value) {
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
