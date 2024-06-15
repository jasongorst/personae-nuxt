export default class AlertMessage {
  text
  severity
  canDismiss
  dismissedIn
  dismissOnLeave

  constructor(
    text, {
      severity = "info",
      canDismiss = true,
      dismissedIn = 4 * 1000,
      dismissOnLeave = false
    } = {}) {
    this.text = text
    this.severity = severity
    this.canDismiss = canDismiss
    this.dismissedIn = dismissedIn
    this.dismissOnLeave = dismissOnLeave
  }
}
