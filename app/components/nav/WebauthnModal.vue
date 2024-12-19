<template>
  <ClientOnly>
    <HDialog
      :open="showModal"
      :initial-focus="dialogRef"
      @close="$emit('close')"
      class="modal modal-open modal-bottom sm:modal-middle"
    >
      <HDialogPanel
        ref="dialogRef"
        class="modal-box card"
      >
        <div class="card-body">
          <HTabGroup>
            <HTabList class="tabs tabs-bordered pb-4">
              <HTab class="tab">
                Sign Up
              </HTab>

              <HTab class="tab">
                Sign In (Password)
              </HTab>

              <HTab class="tab">
                Sign In (Passkey)
              </HTab>
            </HTabList>

            <HTabPanels>
              <HTabPanel>
                <form
                  method="dialog"
                  @submit.prevent="signUp"
                >
                  <UITextInput
                    v-model="credentials.email"
                    id="signup_username"
                    type="email"
                    size="md"
                    placeholder="Email address"
                    autocomplete="email"
                    required
                  >
                    <template #label>
                      Email Address
                    </template>
                  </UITextInput>

                  <UITextInput
                    v-model="credentials.name"
                    id="signup_displayname"
                    type="text"
                    size="md"
                    placeholder="Name"
                    autocomplete="name"
                    required
                  >
                    <template #label>
                      Name
                    </template>
                  </UITextInput>

                  <div class="form-control pt-3">
                    <button
                      class="btn"
                      type="submit"
                      :disabled="!credentials.email || !credentials.name"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </HTabPanel>

              <HTabPanel>
                <UITextInput
                  v-model="credentials.email"
                  id="password_username"
                  type="email"
                  size="md"
                  placeholder="Email address"
                  autocomplete="email"
                  required
                >
                  <template #label>
                    Email Address
                  </template>

                  <template #error v-if="_has(fieldError, 'email')">
                    {{ fieldError.email }}
                  </template>
                </UITextInput>

                <UIPasswordInput
                  v-model="credentials.password"
                  id="password_password"
                  placeholder="Password"
                  autocomplete="current-password"
                  required
                >
                  <template #label>
                    Password
                  </template>

                  <template #error v-if="_has(fieldError, 'password')">
                    {{ fieldError.password }}
                  </template>
                </UIPasswordInput>

                <div class="form-control pt-3">
                  <UILoadingButton
                    @click="signInWithPassword"
                    :is-loading="signInStatus === 'pending'"
                    :disabled="!credentials.email || !credentials.password"
                  >
                    Sign In
                  </UILoadingButton>
                </div>
              </HTabPanel>

              <HTabPanel>
                <form
                  method="dialog"
                  @submit.prevent="signInWithPasskey"
                >
                  <UITextInput
                    v-model="credentials.email"
                    id="signin"
                    type="email"
                    size="md"
                    placeholder="Email address"
                    autocomplete="email webauthn"
                    required
                  >
                    <template #label>
                      Email Address
                    </template>
                  </UITextInput>

                  <div class="form-control pt-3">
                    <button
                      class="btn"
                      type="submit"
                      :disabled="!credentials.email"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </HTabPanel>
            </HTabPanels>
          </HTabGroup>
        </div>
      </HDialogPanel>
    </HDialog>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([ "close" ])

const alertStore = useAlertStore()
const { loggedIn, fetch } = useUserSession()

const { register, authenticate } = useWebAuthn({
  registerEndpoint: "/api/v1/webauthn/register",
  authenticateEndpoint: "/api/v1/webauthn/authenticate",
  useBrowserAutofill: true
})

const dialogRef = ref(null)

const credentials = ref({
  email: null,
  name: null,
  password: null
})

const fieldError = ref(null)
const fieldErrorAlertId = ref(null)

async function signUp() {
  try {
    await register({
      userName: credentials.value.email,
      displayName: credentials.value.name
    })

    await fetch()

    if (loggedIn) {
      emit("close")

      alertStore.addMessage(
        "Your login been registered.", {
          severity: "success",
          dismissedIn: 4000
        }
      )
    }
  } catch (err) {
    console.log(err)

    alertStore.addMessage(
      err.data?.message || err.message, {
        severity: "error",
        dismissOnLeave: true
      }
    )
  }
}

async function signInWithPasskey() {
  try {
    await authenticate(credentials.value.email)

    await fetch()

    if (loggedIn) {
      emit("close")

      alertStore.addMessage(
        "You are now signed in.", {
          severity: "success",
          dismissedIn: 4000
        }
      )
    }
  } catch (err) {
    console.log(err)

    alertStore.addMessage(
      err.data?.message || err.message, {
        severity: "error",
        dismissOnLeave: true
      }
    )
  }
}

function dismissFieldErrorAlert() {
  if (fieldErrorAlertId.value) {
    alertStore.removeMessage(fieldErrorAlertId.value)
  }
}

const { execute: signInWithPassword, status: signInStatus } = useApiCall(
  "http://localhost:3000/auth/login",
  {
    manualFetch: true,
    method: "post",
    body: credentials.value,

    beforeCb: async () => {
      dismissFieldErrorAlert()
      fieldErrorAlertId.value = null
    },

    successCb: async (_) => {
      alertStore.addMessage(
        "You are now signed in.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      // set user in session
    },

    fieldErrorCb: (response) => {
      fieldErrorAlertId.value = alertStore.addMessage(
        "There was a problem signing you in. See below.", {
          severity: "warning",
          dismissOnLeave: true
        }
      )

      fieldError.value = deepConvertValues(
        deepConvertValues(response._data.fieldError, sentenceize),
        joinArrays
      )
    },

    apiErrorCb: async () => {
      alertStore.addMessage(
        "Unable to sign you in. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    fetchErrorCb: async () => {
      alertStore.addMessage(
        "Unable to sign you in. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)
</script>

<style scoped>

</style>