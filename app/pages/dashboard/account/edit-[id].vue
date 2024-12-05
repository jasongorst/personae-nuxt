<template>
  <div class="card bg-base-300 shadow-xl mx-auto max-w-prose">
    <div class="card-body">
      <AccountForm
        v-model="account"
        :field-error="fieldError"
        action="edit"
      />

      <div class="card-actions pt-3 flex-row-reverse">
        <UILoadingButton
          @click="saveAccount"
          :is-loading="savingStatus === 'pending'"
          type="button"
          class="btn-sm btn-secondary uppercase"
        >
          Save
        </UILoadingButton>

        <button
          type="button"
          @click="router.back"
          class="btn btn-sm btn-primary uppercase"
        >
          Cancel
        </button>

        <UILoadingButton
          @click="deleteAccount"
          :is-loading="deletingStatus === 'pending'"
          type="button"
          class="btn btn-sm btn-accent uppercase text-info-content"
          :class="{ 'loading-button-disabled': isOwnAccount }"
          :disabled="isOwnAccount"
          data-tip="Please don't delete your own account."
        >
          Delete
        </UILoadingButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["id"])

const route = useRoute()
const router = useRouter()
const alertStore = useAlertStore()
const fieldError = ref(null)
const fieldErrorAlertId = ref(null)

const accountAttributes = ["email", "password", "status", "admin"]

const accountBody = computed(() => ({
  account: _pick(
    _omitBy(account.value, isBlank),
    accountAttributes
  )
}))

//const sessionStore = useSessionStore()
//const { getAccount } = storeToRefs(sessionStore)

//const isOwnAccount = computed(
//  () => (getAccount.value && (getAccount.value.email === account.value.email))
//)

// dummy sessionStore
const isOwnAccount = computed(
  () => (account.value.email === "jason@evilpaws.org")
)

onBeforeRouteLeave(() => {
  dismissFieldErrorAlert()
})

function dismissFieldErrorAlert() {
  if (fieldErrorAlertId.value) {
    alertStore.removeMessage(fieldErrorAlertId.value)
  }
}

// load account
const { data: account } = await useApiCall(
  `http://localhost:3000/accounts/${route.params.id}`,
  {
    apiErrorCb: () => {
      alertStore.addMessage(
        "The account couldn't be loaded. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    fetchErrorCb: () => {
      alertStore.addMessage(
        "The account couldn't be loaded. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)

// save account
const { execute: saveAccount, status: savingStatus } = useApiCall(
  `http://localhost:3000/accounts/${route.params.id}`,
  {
    manualFetch: true,
    method: "patch",
    body: accountBody,

    beforeCb: async () => {
      dismissFieldErrorAlert()
      fieldErrorAlertId.value = null
    },

    successCb: async () => {
      alertStore.addMessage(
        "The account has been updated.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      await router.push("/dashboard/account")
    },

    fieldErrorCb: (response) => {
      fieldErrorAlertId.value = alertStore.addMessage(
        "There was a problem updating the account. See below.", {
          severity: "warning",
          dismissOnLeave: true
        }
      )

      fieldError.value = deepConvertValues(
        deepConvertValues(response._data, sentenceize),
        joinArrays
      )
    },

    apiErrorCb: async (error) => {
      //if (error?.response?.status === 401) {
      //  alertStore.addMessage(
      //    "You must be signed in to edit accounts.", {
      //      severity: "warning",
      //      dismissOnLeave: true
      //    }
      //  )
      //
      //  await router.replace({ name: "sign-in", query: { next: route.path } })
      //} else {
      alertStore.addMessage(
        "The account couldn't be updated. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
      //}
    },

    fetchErrorCb: () => {
      alertStore.addMessage(
        "The account couldn't be updated. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)

// delete account
const { execute: deleteAccount, status: deletingStatus } = await useApiCall(
  `http://localhost:3000/accounts/${route.params.id}`,
  {
    manualFetch: true,
    method: "delete",

    successCb: async () => {
      alertStore.addMessage(
        "The account has been deleted.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      await router.push("/dashboard/account")
    },

    apiErrorCb: async (error) => {
      //if (error?.response?.status === 401) {
      //  alertStore.addMessage(
      //    "You must be signed in to delete accounts.", {
      //      severity: "warning",
      //      dismissOnLeave: true
      //    }
      //  )
      //
      //  await router.replace({ name: "sign-in", query: { next: route.path } })
      //} else {
      alertStore.addMessage(
        "The account couldn't be deleted. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
      //}
    },

    fetchErrorCb: () => {
      alertStore.addMessage(
        "The account couldn't be deleted. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)
</script>

<style>
.tooltip-late:hover:before,
.tooltip-late:hover:after {
  @apply delay-500;
}

.loading-button-disabled {
  @apply tooltip tooltip-info tooltip-bottom tooltip-late;
  @apply no-animation cursor-not-allowed !pointer-events-auto;
  @apply before:font-light before:normal-case before:!text-info-content;
}
</style>
