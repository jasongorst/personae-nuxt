export function useComboAuth(
  {
    onRegistered = _noop,
    onLoggedIn = _noop,
    onLoggedOut = _noop,
    onLoginFailure = _noop,
    onError = _noop,
    onRegisterError = _noop,
    onLoginError = _noop,
    onLogoutError = _noop
  }
) {
  // session from useUserSession (nuxt-auth-utils) is authoritative (as nuxtAuthUtilsSession)

  // nuxt-auth (password-based login via personae-api)
  const {
    status: nuxtAuthStatus,
    data: nuxtAuthSession,
    // lastRefreshedAt,
    token: nuxtAuthToken,
    // refreshToken,
    // getSession,
    // signUp,
    signIn: nuxtAuthSignIn,
    signOut: nuxtAuthSignOut,
    // refresh
  } = useAuth()

// nuxt-auth-utils (webauthn via local db)
  const {
    ready,
    loggedIn: nuxtAuthUtilsLoggedIn,
    user: nuxtAuthUtilsUser,
    session: nuxtAuthUtilsSession,
    fetch: fetchNuxtAuthUtilsSession,
    clear: clearNuxtAuthUtilsSession
  } = useUserSession()

  const { register, authenticate } = useWebAuthn({
    registerEndpoint: "/api/v1/webauthn/register",
    authenticateEndpoint: "/api/v1/webauthn/authenticate",
    useBrowserAutofill: true
  })

  const loading = ref(false)
  const error = ref(null)

  async function registerWithPasskey(email) {
    try {
      loading.value = true

      await register({
        userName: toValue(email),
        admin: false
      })

      await onRegistered()
      await fetchNuxtAuthUtilsSession()
      loading.value = false

      if (nuxtAuthUtilsLoggedIn.value) {
        await onLoggedIn()
      } else {
        await onLoginFailure()
      }
    } catch (e) {
      error.value = e
      await onRegisterError(e)
      await onError(e)
    }
  }

  async function signInWithPasskey(email) {
    try {
      loading.value = true
      // NOTE: authenticate endpoint adds { loggedInWith: "nuxt-auth" } to session
      await authenticate(toValue(email))
      await fetchNuxtAuthUtilsSession()
      loading.value = false

      if (nuxtAuthUtilsLoggedIn.value) {
        await onLoggedIn()
      } else {
        await onLoginFailure()
      }
    } catch (e) {
      error.value = e
      await onLoginError(e)
      await onError(e)
    }
  }

  async function signInWithPassword(email, password) {
    try {
      loading.value = true

      await nuxtAuthSignIn(
        { email: toValue(email), password: toValue(password) },
        { redirect: false }
      )

      if (nuxtAuthStatus.value === "authenticated") {
        // set nuxt-auth-utils session from nuxt-auth session
        await useReplaceSession({
          user: {
            email: nuxtAuthSession.value.email,
            admin: nuxtAuthSession.value.admin
          },

          token: nuxtAuthToken.value
        })

        loading.value = false
        await onLoggedIn()
      } else {
        await onLoginFailure()
      }
    } catch (e) {
      error.value = e
      await onLoginError(e)
      await onError(e)
    }
  }

  async function signOut() {
    try {
      loading.value = true

      if (nuxtAuthUtilsSession.value._has("token")) {
        await nuxtAuthSignOut({ redirect: false })
      }

      await clearNuxtAuthUtilsSession()
      loading.value = false
      await onLoggedOut()
    } catch (e) {
      error.value = e
      await onLogoutError(e)
      await onError(e)
    }
  }

  return {
    ready,
    loggedIn: nuxtAuthUtilsLoggedIn,
    user: nuxtAuthUtilsUser,
    session: nuxtAuthUtilsSession,
    fetch: fetchNuxtAuthUtilsSession,
    registerWithPasskey,
    signInWithPasskey,
    signInWithPassword,
    signOut,
    loading,
    error
  }
}
