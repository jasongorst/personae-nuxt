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

<!--      <template #error v-if="_has(fieldError, 'email')">-->
<!--        {{ fieldError.email }}-->
<!--      </template>-->
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

<!--      <template #error v-if="_has(fieldError, 'password')">-->
<!--        {{ fieldError.password }}-->
<!--      </template>-->
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
        @click="handleSignIn"
        :is-loading="status === 'loading'"
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

const { status, data, getSession, signIn } = useAuth()

const nextRoute = route.query.next ? route.query.next : "/"

const credentials = ref({
  email: null,
  password: null
})

async function handleSignIn() {
  await signIn(credentials.value, { callbackUrl: nextRoute })
}
</script>

<style scoped>

</style>
