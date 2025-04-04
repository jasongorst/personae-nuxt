export const useAlert = defineStore("alert", () => {
  // state
  const messages = ref(new Map())
  const nextId = ref(1)

  // getters
  const count = computed(() => messages.value.size)
  const hasMessages = computed(() => isPositive(count.value))

  // actions
  function add(text, {
    severity = "info",
    dismissable = true,
    dismissedIn = 0,
    dismissOnLeave = false
  } = {}) {
    const id = nextId.value

    // if neither dismissable nor auto-dismissed, make the alert dismissable
    if (!dismissable && dismissedIn === 0) {
      dismissable = true

      console.warn(`added eternal alert, changed to dismissable [id: ${id}]`)
    }

    messages.value.set(id, {
      text: text,
      severity: severity,
      dismissable: dismissable,
      dismissedIn: dismissedIn,
      dismissOnLeave: dismissOnLeave
    })

    nextId.value++
    return id
  }

  function get(id) {
    return messages.value.get(id)
  }

  function clear() {
    messages.value.clear()
  }

  function remove(id) {
    return messages.value.delete(id)
  }

  return {
    messages,
    nextId,
    count,
    hasMessages,
    add,
    get,
    clear,
    remove
  }
})

// hmr support
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAlert, import.meta.hot))
}
