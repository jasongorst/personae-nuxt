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
      v-model="passwordConfirm"
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
  inheritAttrs: false
})

const confirmedPassword = defineModel({ type: String })

const props = defineProps({
  // id of input
  id: {
    type: String,
    default: () => uuid()
  },
  // size of input
  size: {
    type: String,
    default: "md",
    validator(value) {
      return uiSizes.includes(value)
    }
  },
  // class for outer div
  wrapperClass: {
    type: [ Array, String ],
    default: () => ""
  },
  // class for label
  labelClass: {
    type: [ Array, String ],
    default: "text-secondary"
  },
  // class for error
  errorClass: {
    type: [ Array, String ],
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

const emit = defineEmits([ "hasMismatchError" ])

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
