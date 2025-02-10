<template>
  <UITextInput
    id="email"
    v-model="account.email"
    size="sm"
    type="email"
  >
    <template #legend>
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
    <template #legend>
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
    disabled-tooltip="Please don't change your own status."
    size="sm"
    wrapper-class="flex flex-col"
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
    disabled-tooltip="Please don't remove your own admin flag."
    size="sm"
    wrapper-class="flex! flex-row gap-3 pt-3 items-center"
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
