export default function confirm(prompt, event) {
  if (window.confirm(prompt)) {
    return true
  } else {
    // call event's preventDefault (if needed)
    if (event instanceof Event && event.cancelable) {
      event.preventDefault()
    }

    return false
  }
}
