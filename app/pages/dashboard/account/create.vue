<template>
  <div class="card bg-base-300 shadow-xl mx-auto max-w-prose">
    <div class="card-body">
      <AccountForm
        v-model="account"
        :field-error="fieldError"
        action="create"
      />

      <div class="card-actions pt-3 flex-row-reverse">
        <UILoadingButton
          @click="saveAccount"
          :is-loading="savingStatus === 'pending'"
          type="button"
          class="btn btn-sm btn-secondary uppercase"
        >
          Save
        </UILoadingButton>

        <button
          @click="router.back"
          class="btn btn-sm btn-primary uppercase"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const alertStore = useAlertStore()
const { token } = useAuth()

const fieldError = ref(null)
const fieldErrorAlertId = ref(null)

const account = ref({
  email: null,
  password: null,
  status: "verified",
  admin: false
})

onBeforeRouteLeave(() => {
  dismissFieldErrorAlert()
})

function dismissFieldErrorAlert() {
  if (fieldErrorAlertId.value) {
    alertStore.removeMessage(fieldErrorAlertId.value)
  }
}

const { execute: saveAccount, status: savingStatus } = await useApi(
  "/accounts",
  {
    body: { account: account },
    method: "post",
    token: token,
    manual: true,

    onRequest: async () => {
      dismissFieldErrorAlert()
      fieldErrorAlertId.value = null
    },

    onRequestError: () => {
      alertStore.addMessage(
        "The account couldn't be created. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    onResponse: async () => {
      alertStore.addMessage(
        "The account has been created.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      await router.push("/dashboard/account")
    },

    onResponseError: async () => {
      alertStore.addMessage(
        "The account couldn't be created. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    onFieldError: (response) => {
      fieldErrorAlertId.value = alertStore.addMessage(
        "There was a problem creating the account. See below.", {
          severity: "warning",
          dismissOnLeave: true
        }
      )

      fieldError.value = deepConvertValues(deepConvertValues(response._data, sentenceize), joinArrays)
    }
  }
)
</script>

<style scoped>

</style>
