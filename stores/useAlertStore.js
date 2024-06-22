export default defineStore("alert", {
  state: () => ({
    messages: new Map(),
    nextId: 1
  }),

  getters: {
    hasMessages(state) {
      return isPositive(state.messages.size)
    },
    messageCount(state) {
      return state.messages.size
    }
  },

  actions: {
    addMessage(text, {
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

    getMessage(id) {
      return this.messages.get(id)
    },

    removeAllMessages() {
      this.$reset()
    },

    removeMessage(id) {
      this.messages.delete(id)
    }
  }
})
