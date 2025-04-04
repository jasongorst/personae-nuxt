import { setActivePinia, createPinia } from "pinia"

let alert

beforeEach(() => {
  setActivePinia(createPinia())
  alert = useAlert()
})

it("should initialize state", () => {
  expect(alert.messages).toEqual(new Map())
  expect(alert.nextId).toBe(1)
})

describe("useAlert actions", () => {
  let testAlertId

  beforeEach(() => {
    testAlertId = alert.add("test")
  })

  it("should add an alert", () => {
    expect(alert.count).toBe(1)
    expect(alert.hasMessages).toBe(true)
    expect(testAlertId).toBe(1)
  })

  it("should get an alert", () => {
    const testAlert = alert.get(testAlertId)

    expect(testAlert.text).toBe("test")
  })

  it("should remove an alert", () => {
    alert.remove(testAlertId)

    expect(alert.count).toBe(0)
  })

  it("should clear alerts", () => {
    alert.clear()

    expect(alert.count).toBe(0)
  })
})

describe("useAlert getters", () => {
  it("should get count === 0 after init", () => {
    expect(alert.count).toBe(0)
  })

  it("should get count === 1 after add()", () => {
    alert.add("test")

    expect(alert.count).toBe(1)
  })

  it("should get hasMessages === false after init", () => {
    expect(alert.hasMessages).toBe(false)
  })

  it("should get hasMessages === true after add()", () => {
    alert.add("test")

    expect(alert.hasMessages).toBe(true)
  })
})

it("shouldn't create an eternal alert", () => {
  const eternalAttemptId = alert.add("eternal", { dismissable: false, dismissedIn: 0 })
  const eternalAttempt = alert.get(eternalAttemptId)

  expect(eternalAttempt.dismissable).toBe(true)
})
