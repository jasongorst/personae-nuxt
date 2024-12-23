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
                  <UILoadingButton
                    @click="registerWithPasskey(credentials.email, credentials.name)"
                    :is-loading="!ready"
                    :disabled="!credentials.email || !credentials.name"
                  >
                    Sign Up
                  </UILoadingButton>
                </div>
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
                    @click="signInWithPassword(credentials.email, credentials.password)"
                    :is-loading="!ready"
                    :disabled="!credentials.email || !credentials.password"
                  >
                    Sign In
                  </UILoadingButton>
                </div>
              </HTabPanel>

              <HTabPanel>
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
                  <UILoadingButton
                    @click="signInWithPasskey(credentials.email)"
                    :is-loading="!ready"
                    :disabled="!credentials.email"
                  >
                    Sign In
                  </UILoadingButton>
                </div>
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

const { ready, registerWithPasskey, signInWithPasskey, signInWithPassword } = useComboAuth({
  onRegistered() {
    emit("close")

    alertStore.addMessage(
      "Your login been registered.", {
        severity: "success",
        dismissedIn: 4000
      }
    )
  },

  onLoggedIn() {
    emit("close")

    alertStore.addMessage(
      "You are now signed in.", {
        severity: "success",
        dismissedIn: 4000
      }
    )
  },

  onError(error) {
    emit("close")
    console.log(error)

    alertStore.addMessage(
      error.data?.message || error.message, {
        severity: "error",
        dismissOnLeave: true
      }
    )
  }
})

// ref to HDialogPanel so we can set initial focus
const dialogPanelRef = ref(null)

const credentials = ref({
  email: null,
  name: null,
  password: null
})
</script>

<style scoped>

</style>