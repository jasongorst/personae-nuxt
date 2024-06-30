<template>
  <TextInput
    v-model="account.email"
    id="email"
    type="email"
    size="sm"
  >
    <template #label>
      Email
    </template>

    <template #error v-if="_has(fieldError, 'email')">
      {{ fieldError.email }}
    </template>
  </TextInput>

  <PasswordConfirm
    v-model="account.password"
    id="password"
    size="sm"
  >
    <template #label>
      {{ action === "edit" ? "New Password" : "Password" }}
    </template>

    <template #error v-if="_has(fieldError, 'password')">
      {{ fieldError.password }}
    </template>
  </PasswordConfirm>

  <SelectInput
    v-model="account.status"
    id="status"
    size="sm"
    wrapper-class="flex flex-col"
    :options="statusValues"
    :disabled="isOwnAccount"
    disabled-tooltip="Please don't change your own status."
  >
    <template #label>
      Status
    </template>

    <template #error v-if="_has(fieldError, 'status')">
      {{ fieldError.status }}
    </template>
  </SelectInput>

  <TextInput
    v-model="account.admin"
    id="admin"
    type="checkbox"
    size="sm"
    wrapper-class="flex flex-row gap-3 pt-3 items-center"
    :disabled="isOwnAccount"
    disabled-tooltip="Please don't remove your own admin flag."
  >
    <template #label>
      Admin?
    </template>

    <template #error v-if="_has(fieldError, 'admin')">
      {{ fieldError.admin }}
    </template>
  </TextInput>
</template>

<script setup>
//import { useSessionStore } from "@/stores/useSessionStore.js"

const account = defineModel()

const props = defineProps({
  action: {
    type: String,
    default: "create",
    validator(value) {
      return ["create", "edit"].includes(value)
    }
  },
  fieldError: {
    type: Object,
    default: {}
  }
})

//const sessionStore = useSessionStore()
//const { getAccount } = storeToRefs(sessionStore)

const statusValues = ["unverified", "verified", "closed"]

//const isOwnAccount = computed(
//  () => getAccount.value && (getAccount.value.email === account.value.email)
//)

// dummy isOwnAccount
const isOwnAccount = false
</script>

<style scoped>

</style>
