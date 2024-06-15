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
      canDismiss = true,
      dismissedIn = 4 * 1000,
      dismissOnLeave = false
    } = {}) {
      const id = this.nextId

      const message = new AlertMessage(text, {
        severity,
        canDismiss,
        dismissedIn,
        dismissOnLeave
      })

      this.messages.set(id, message)
      this.nextId++

      return id
    },

    getMessageID(id) {
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
