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
  //  loggedInWith: String ["nuxt-auth", "nuxt-auth-utils"]

  // nuxt-auth (password-based login via personae-api)
  const {
    status: nuxtAuthStatus,
    data: nuxtAuthSession,
    // lastRefreshedAt,
    // token,
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

  const error = ref(null)

  async function registerWithPasskey(email) {
    try {
      await register({
        userName: toValue(email),
        admin: false
      })

      await onRegistered()
      await fetchNuxtAuthUtilsSession()

      if (nuxtAuthUtilsLoggedIn.value) {
        await onLoggedIn()
      } else {
        await onLoginFailure()
      }
    } catch (error) {
      error.value = error
      await onRegisterError(error)
      await onError(error)
    }
  }

  async function signInWithPasskey(email) {
    try {
      // NOTE: authenticate endpoint adds { loggedInWith: "nuxt-auth" } to session
      await authenticate(toValue(email))
      await fetchNuxtAuthUtilsSession()

      if (nuxtAuthUtilsLoggedIn.value) {
        await onLoggedIn()
      } else {
        await onLoginFailure()
      }
    } catch (error) {
      error.value = error
      await onLoginError(error)
      await onError(error)
    }
  }

  async function signInWithPassword(email, password) {
    const credentials = {
      email: toValue(email),
      password: toValue(password)
    }

    try {
      await nuxtAuthSignIn(credentials, { redirect: false })

      if (nuxtAuthStatus.value === "authenticated") {
        // set nuxt-auth-utils session from nuxt-auth session
        // NOTE: useSetSession adds { loggedInWith: "nuxt-auth-utils" } to session
        await useSetSession(nuxtAuthSession.value)

        await onLoggedIn()
      } else {
        await onLoginFailure()
      }
    } catch (error) {
      error.value = error
      await onLoginError(error)
      await onError(error)
    }
  }

  async function signOut() {
    try {
      if (nuxtAuthUtilsSession.value?.loggedInWith === "nuxt-auth") {
        await nuxtAuthSignOut({ redirect: false })
      }

      await clearNuxtAuthUtilsSession()
      await onLoggedOut()
    } catch (error) {
      error.value = error
      await onLogoutError(error)
      await onError(error)
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
    error
  }
}
