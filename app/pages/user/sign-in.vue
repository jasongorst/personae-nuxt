<template>
  <div class="flex flex-col gap-3">
    <h1 class="text-2xl">
      Sign In
    </h1>

    <UITextInput
      v-model="credentials.email"
      id="login"
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
      id="password"
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

    <UIToggleInput
      class="toggle-success"
      id="remember-me"
      size="sm"
      wrapper-class="!flex flex-row gap-3 pt-3 items-center"
      label-class="cursor-pointer"
    >
      <template #label>
        Stay Signed In
      </template>
    </UIToggleInput>

    <div class="form-control pt-3">
      <UILoadingButton
        class="btn"
        @click="signIn"
        :is-loading="signInStatus === 'pending'"
      >
        Sign In
      </UILoadingButton>
    </div>
  </div>

  <div class="pt-2">
    <ul class="pt-3 flex flex-col gap-2">
      <li>
        <NuxtLink
          to="/user/create-account"
          class="link-hover"
        >
          Create a New Account
        </NuxtLink>
      </li>

      <li>
        <NuxtLink
          to="/user/request-password-reset"
          class="link-hover"
        >
          Forgot Password
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const alert = useAlert()
const sessionStore = useSessionStore()

const nextRoute = route.query.next ? route.query.next : "/"

const credentials = ref({
  email: null,
  password: null
})

const useLocalStorage = ref(true)

const fieldError = ref(null)
const fieldErrorAlertId = ref(null)

onBeforeRouteLeave(() => {
  dismissFieldErrorAlert()
})

function dismissFieldErrorAlert() {
  if (fieldErrorAlertId.value) {
    alert.remove(fieldErrorAlertId.value)
  }
}

const { execute: signIn, status: signInStatus } = useApiCall(
  "http://localhost:3000/auth/login",
  {
    manual: true,
    method: "post",
    body: credentials.value,

    beforeCb: async () => {
      dismissFieldErrorAlert()
      fieldErrorAlertId.value = null
    },

    successCb: async (response) => {
      alert.add(
        "You are now signed in.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      sessionStore.set(credentials.value.email, response._data.isAdmin)

      //await router.push(nextRoute)
    },

    fieldErrorCb: (response) => {
      fieldErrorAlertId.value = alert.add(
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
      alert.add(
        "Unable to sign you in. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )

      await router.back()
    },

    fetchErrorCb: async () => {
      alert.add(
        "Unable to sign you in. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )

      await router.back()
    }
  }
)
</script>

<style scoped>

</style>
