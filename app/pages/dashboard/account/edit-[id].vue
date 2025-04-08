<template>
  <div
    class="card bg-base-300 shadow-xl mx-auto max-w-prose"
    data-testid="account-edit"
  >
    <div class="card-body">
      <AccountForm
        v-model="account"
        :field-error="fieldError"
        action="edit"
      />

      <div class="card-actions pt-4 flex-row-reverse">
        <UILoadingButton
          @click="saveAccount"
          :is-loading="savingStatus === 'pending'"
          type="button"
          class="btn btn-sm btn-secondary uppercase"
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
const props = defineProps([ "id" ])

const route = useRoute()
const router = useRouter()
const alert = useAlert()
const { data, token } = useAuth()

const fieldError = ref(null)
const fieldErrorAlertId = ref(null)

const accountAttributes = [ "email", "password", "status", "admin" ]

const accountBody = computed(() => ({
  account: _pick(
    _omitBy(account.value, isBlank),
    accountAttributes
  )
}))

const isOwnAccount = computed(
  () => (data.value?.email === account.value.email)
)

onBeforeRouteLeave(() => {
  dismissFieldErrorAlert()
})

function dismissFieldErrorAlert() {
  if (fieldErrorAlertId.value) {
    alert.remove(fieldErrorAlertId.value)
  }
}

// load account
const { data: account } = await useApi(
  `/accounts/${route.params.id}`,
  {
    token: token,

    onRequestError: () => {
      alert.add(
        "The account couldn't be loaded. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    onResponseError: () => {
      alert.add(
        "The account couldn't be loaded. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)

// save account
const { execute: saveAccount, status: savingStatus } = useApi(
  `/accounts/${route.params.id}`,
  {
    body: computed(() => ({ account: _pick(_omitBy(account.value, isBlank), accountAttributes) })),
    method: "patch",
    token: token,
    manual: true,

    onRequest: () => {
      dismissFieldErrorAlert()
      fieldErrorAlertId.value = null
    },

    onRequestError: () => {
      alert.add(
        "The account couldn't be updated. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    onResponse: async () => {
      alert.add(
        "The account has been updated.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      await router.push("/dashboard/account")
    },

    onResponseError: () => {
      alert.add(
        "The account couldn't be updated. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    onFieldError: ({ response }) => {
      fieldErrorAlertId.value = alert.add(
        "There was a problem updating the account. See below.", {
          severity: "warning",
          dismissOnLeave: true
        }
      )

      fieldError.value = deepConvertValues(deepConvertValues(response._data, sentenceize), joinArrays)
    }
  }
)

// delete account
const { execute: deleteAccount, status: deletingStatus } = await useApi(
  `/accounts/${route.params.id}`,
  {
    method: "delete",
    token: token,
    manual: true,

    onRequestError: () => {
      alert.add(
        "The account couldn't be deleted. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    onResponse: async () => {
      alert.add(
        "The account has been deleted.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      await router.push("/dashboard/account")
    },

    onResponseError: async () => {
      alert.add(
        "The account couldn't be deleted. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)
</script>

<style>
@reference "~/assets/css/main.css";

@layer components {
  .loading-button-disabled {
    @apply tooltip tooltip-info tooltip-bottom tooltip-late;
    @apply transition-none cursor-not-allowed pointer-events-auto!;
    @apply before:font-light before:normal-case before:text-info-content!;
  }
}
</style>
