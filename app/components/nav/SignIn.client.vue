<template>
  <HeadlessDialog
    :open="open"
    :initial-focus="dialogPanelRef"
    @close="closeModal"
    class="modal modal-open modal-bottom sm:modal-middle"
  >
    <HeadlessDialogPanel
      ref="dialogPanelRef"
      class="modal-box card p-0"
      data-testid="signup"
    >
      <div class="card-body gap-2">
        <form
          @submit.prevent="signInWithPassword"
          class="contents"
        >
          <UITextInput
            v-model="credentials.email"
            label-class="pt-0"
            id="password_email"
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

          <UILoadingButton
            type="submit"
            class="btn btn-block mt-3"
            :is-loading="isLoading"
            :disabled="!credentials.email || !credentials.password"
          >
            Sign In
          </UILoadingButton>
        </form>
      </div>
    </HeadlessDialogPanel>
  </HeadlessDialog>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([ "close" ])

const alert = useAlert()
const { status, signIn } = useAuth()
const isLoading = computed(() => status.value === "loading")
const dialogPanelRef = ref(null)

const credentials = ref({
  email: null,
  password: null
})

async function signInWithPassword() {
  try {
    await signIn(credentials.value, { redirect: false })
    closeModal()

    alert.add(
      "You are now signed in.", {
        severity: "success",
        dismissedIn: 4000
      }
    )
  } catch (error) {
    console.log(error)

    alert.add(
      error.data?.message || error.message, {
        severity: "error",
        dismissOnLeave: true
      }
    )
  }
}

function closeModal() {
  emit("close")
}
</script>

<style scoped>

</style>