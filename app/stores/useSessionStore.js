export default defineStore("session", {
  state: () => ({
    email: null,
    isAdmin: false
  }),

  getters: {
    isSignedIn(state) {
      return isPresent(state.email)
    },
  },

  actions: {
    clear() {
      this.$reset()
    },

    set(email, isAdmin = false) {
      this.$patch({
        email: email,
        isAdmin: isAdmin
      })
    }
  },

  // use pinia-plugin-persistedstate
  persist: true
})
