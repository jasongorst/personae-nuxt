export const useAlert = defineStore("alert", {
  state: () => ({
    messages: new Map(),
    nextId: 1
  }),

  getters: {
    hasMessages(state) {
      return isPositive(state.messages.size)
    },

    count(state) {
      return state.messages.size
    }
  },

  actions: {
    add(text, {
      severity = "info",
      dismissable = true,
      dismissedIn = 0,
      dismissOnLeave = false
    } = {}) {
      const id = this.nextId

      // if neither dismissable nor auto-dismissed, make the alert dismissable
      if (!dismissable && dismissedIn === 0) {
        dismissable = true
      }

      this.messages.set(id, {
        text: text,
        severity: severity,
        dismissable: dismissable,
        dismissedIn: dismissedIn,
        dismissOnLeave: dismissOnLeave
      })

      this.nextId++
      return id
    },

    get(id) {
      return this.messages.get(id)
    },

    clear() {
      this.$reset()
    },

    remove(id) {
      this.messages.delete(id)
    }
  }
})

// hmr support
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAlert, import.meta.hot))
}
