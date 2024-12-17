<template>
  <input type="checkbox" id="webauthn_modal" class="modal-toggle" checked />
  <div
    class="modal modal-bottom sm:modal-middle"
    role="dialog"
  >
    <div class="modal-box card">
      <div class="card-body">
        <h3 class="card-title">
          Login with credential
        </h3>

        <p>First time? Register your credential</p>

        <div class="modal-action">
          <form
            method="dialog"
            @submit.prevent="signUp"
          >
            <UITextInput
              v-model="userName"
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
              v-model="displayName"
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
                :disabled="!userName"
              >
                Register
              </button>
            </div>
          </form>

          <div class="divider">OR</div>

          <form
            method="dialog"
            @submit.prevent="signIn"
          >
            <UITextInput
              v-model="userName"
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
                :disabled="!userName"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const showModal = ref(props.show)

const signingIn = ref(false)
const userName = ref("")
const displayName = ref("")

const alertStore = useAlertStore()

const { fetch } = useUserSession()

const { register, authenticate } = useWebAuthn({
  registerEndpoint: "/api/v1/webauthn/register",
  authenticateEndpoint: "/api/v1/webauthn/authenticate",
  useBrowserAutofill: true
})

async function signUp() {
  if (signingIn.value || !userName.value || !displayName.value) return

  signingIn.value = true

  await register({
    userName: userName.value,
    displayName: displayName.value
  })
    .then(fetch())
    .then(() => showModal.value = false)
    .catch((err) => {
      console.log(err)

      alertStore.addMessage(
        err.data?.message || err.message, {
          severity: "error",
          dismissOnLeave: true
        }
      )
    })

  signingIn.value = false
}

async function signIn() {
  if (signingIn.value) return

  signingIn.value = true

  await authenticate(userName.value)
    .then(fetch)
    .then(() => showModal.value = false)
    .catch((err) => {
      console.log(err)

      alertStore.addMessage(
        err.data?.message || err.message, {
          severity: "error",
          dismissOnLeave: true
        }
      )
    })

  signingIn.value = false
}
</script>

<style scoped>

</style>