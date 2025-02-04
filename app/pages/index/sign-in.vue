<template>
  <ClientOnly>
    <HeadlessDialog
      :open="showSignInModal"
      :initial-focus="dialogPanelRef"
      @close="closeModal"
      class="modal modal-open modal-bottom sm:modal-middle"
    >
      <HeadlessDialogPanel
        ref="dialogPanelRef"
        class="modal-box card"
      >
        <div class="card-body">
          <UITextInput
            v-model="credentials.email"
            id="password_email"
            type="email"
            size="md"
            placeholder="Email address"
            autocomplete="email"
            required
          >
            <template #legend>
              Email Address
            </template>

<!--            <template #error>-->
<!--              Something is wrong here.-->
<!--            </template>-->
          </UITextInput>

          <UIPasswordInput
            v-model="credentials.password"
            id="password_password"
            placeholder="Password"
            autocomplete="current-password"
            required
          >
            <template #legend>
              Password
            </template>

<!--            <template #error>-->
<!--              Here too.-->
<!--            </template>-->
          </UIPasswordInput>

          <div class="form-control pt-3">
            <UILoadingButton
              class="btn btn-block"
              @click="signInWithPassword"
              :is-loading="isLoading"
              :disabled="!credentials.email || !credentials.password"
            >
              Sign In
            </UILoadingButton>
          </div>
        </div>
      </HeadlessDialogPanel>
    </HeadlessDialog>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  path: "/sign-in"
})

const alert = useAlert()
const router = useRouter()
const showSignInModal = useState("showSignInModal")
const { status, signIn } = useAuth()
const isLoading = computed(() => status.value === "loading")
const dialogPanelRef = ref(null)

const credentials = ref({
  email: null,
  password: null
})

onMounted(() => {
  showSignInModal.value = true
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
    closeModal()
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
  showSignInModal.value = false
  router.back()
}
</script>

<style scoped>

</style>