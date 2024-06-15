export const useSessionStore = defineStore("session", {
  state: () => {
    let sessionState = {
      email: null,
      isAdmin: false
    }

    _assign(
      sessionState,
      getJSONCookie("account"),
      JSON.parse(localStorage.getItem("account"))
    )

    return sessionState
  },

  getters: {
    getAccount(state) {
      return {
        email: state.email,
        isAdmin: state.isAdmin
      }
    },

    isSignedIn(state) {
      return isPresent(state.email)
    },
  },

  actions: {
    clear() {
      clearJSONCookie("account")
      localStorage.removeItem("account")
      this.$reset()
    },

    set(email, isAdmin = false, useLocalStorage = false) {
      const account = {
        email: email,
        isAdmin: isAdmin
      }

      if (useLocalStorage) {
        localStorage.setItem("account", JSON.stringify(account))
      } else {
        setJSONCookie("account", account)
      }

      this.$patch(account)
    }
  }
})
