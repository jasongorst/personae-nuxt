<template>
  <UITextInput
    id="email"
    v-model="account.email"
    size="sm"
    type="email"
  >
    <template #label>
      Email
    </template>

    <template v-if="_has(fieldError, 'email')" #error>
      {{ fieldError.email }}
    </template>
  </UITextInput>

  <UIPasswordConfirm
    id="password"
    v-model="account.password"
    size="sm"
  >
    <template #label>
      {{ action === "edit" ? "New Password" : "Password" }}
    </template>

    <template v-if="_has(fieldError, 'password')" #error>
      {{ fieldError.password }}
    </template>
  </UIPasswordConfirm>

  <UISelectInput
    id="status"
    v-model="account.status"
    :disabled="isOwnAccount"
    :options="statusValues"
    :tooltip="isOwnAccount ? 'Please don\'t change your own status.' : null"
    size="sm"
  >
    <template #label>
      Status
    </template>

    <template v-if="_has(fieldError, 'status')" #error>
      {{ fieldError.status }}
    </template>
  </UISelectInput>

  <UICheckboxInput
    id="admin"
    v-model="account.admin"
    :disabled="isOwnAccount"
    :tooltip="isOwnAccount ? 'Please don\'t remove your own admin flag.' : null"
    size="sm"
    wrapper-class="flex flex-row gap-2 items-center pt-4"
  >
    <template #label>
      Admin?
    </template>

    <template v-if="_has(fieldError, 'admin')" #error>
      {{ fieldError.admin }}
    </template>
  </UICheckboxInput>
</template>

<script setup>
const account = defineModel()

const props = defineProps({
  action: {
    type: String,
    default: "create",
    validator(value) {
      return [ "create", "edit" ].includes(value)
    }
  },
  fieldError: {
    type: Object,
    default: {}
  }
})

const { data } = useAuth()
const statusValues = [ "unverified", "verified", "closed" ]

const isOwnAccount = computed(
  () => (data.value?.email === account.value.email)
)

</script>

<style scoped>

</style>
