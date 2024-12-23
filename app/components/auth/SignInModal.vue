<template>
  <ClientOnly>
    <HDialog
      :open="showModal"
      :initial-focus="dialogPanelRef"
      @close="$emit('close')"
      class="modal modal-open modal-bottom sm:modal-middle"
    >
      <HDialogPanel
        ref="dialogPanelRef"
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
                </UIPasswordInput>

                <div class="form-control pt-3">
                  <UILoadingButton
                    @click="signInWithPassword"
                    :is-loading="signInStatus === 'loading'"
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

// nuxt-auth (password-based login via personae-api)
const { status: signInStatus, signIn } = useAuth()

// nuxt-auth-utils (webauthn via local db)
const { loggedIn, fetch: refetchUserSession } = useUserSession()

const { register, authenticate } = useWebAuthn({
  registerEndpoint: "/api/v1/webauthn/register",
  authenticateEndpoint: "/api/v1/webauthn/authenticate",
  useBrowserAutofill: true
})

// ref to HDialogPanel so we can set initial focus
const dialogPanelRef = ref(null)

const credentials = ref({
  email: null,
  name: null,
  password: null
})

async function signUp() {
  try {
    await register({
      userName: credentials.value.email,
      displayName: credentials.value.name
    })

    await refetchUserSession()

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
    await refetchUserSession()

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
    alertStore.addMessage(
      err.data?.message || err.message, {
        severity: "error",
        dismissOnLeave: true
      }
    )
  }
}

async function signInWithPassword() {
  try {
    await signIn(credentials.value, { redirect: false })

    if ((signInStatus.value === "authenticated")) {
      emit("close")

      // fetch nuxt-auth user
      const { data } = useAuthState()

      // set nuxt-auth-utils user session
      await useSetSession(data.value)
      await refetchUserSession()

      alertStore.addMessage(
        "You are now signed in.", {
          severity: "success",
          dismissedIn: 4000
        }
      )
    }
  } catch (err) {
    alertStore.addMessage(
      err.data?.message || err.message, {
        severity: "error",
        dismissOnLeave: true
      }
    )
  }
}
</script>

<style scoped>

</style>