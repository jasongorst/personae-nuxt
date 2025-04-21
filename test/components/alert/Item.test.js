import { mockComponent, mountSuspended } from "@nuxt/test-utils/runtime"
import sleep from "~/utils/sleep"
import AlertItem from "~/components/alert/Item.vue"

mockComponent("Icon", () => import("~~/test/mocks/Icon.mock.vue"))

it("should render", async () => {
  const wrapper = await mountSuspended(AlertItem)

  expect(wrapper.get("[data-testid='alert-item']").exists()).toBe(true)
})

it("should renter the slot content", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    slots: { default: () => "foo" }
  })

  expect(wrapper.get("[data-testid='slot']").text()).toBe("foo")
})

it("should use the correct border color when the severity prop is 'info'", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { severity: "info" }
  })

  expect(wrapper.get("[data-testid='alert-item']").classes()).toContain("border-info/50")
})

it("should use the correct border color when the severity prop is 'error'", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { severity: "error" }
  })

  expect(wrapper.get("[data-testid='alert-item']").classes()).toContain("border-error/50")
})

it("should use the correct border color when the severity prop is 'warning'", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { severity: "warning" }
  })

  expect(wrapper.get("[data-testid='alert-item']").classes()).toContain("border-warning/50")
})

it("should use the correct border color when the severity prop is 'success'", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { severity: "success" }
  })

  expect(wrapper.get("[data-testid='alert-item']").classes()).toContain("border-success/50")
})

it("should use the correct icon color when the severity prop is 'info'", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { severity: "info" }
  })

  expect(wrapper.get("[data-testid='icon-wrapper']").classes()).toContain("text-info")
})

it("should use the correct icon color when the severity prop is 'error'", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { severity: "error" }
  })

  expect(wrapper.get("[data-testid='icon-wrapper']").classes()).toContain("text-error")
})

it("should use the correct icon color when the severity prop is 'warning'", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { severity: "warning" }
  })

  expect(wrapper.get("[data-testid='icon-wrapper']").classes()).toContain("text-warning")
})

it("should use the correct icon color when the severity prop is 'success'", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { severity: "success" }
  })

  expect(wrapper.get("[data-testid='icon-wrapper']").classes()).toContain("text-success")
})

it("should use the correct icon when the severity prop is 'info'", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { severity: "info" }
  })

  expect(wrapper.get("[data-testid='icon-wrapper']").text()).toBe("ph:info-fill")
})

it("should use the correct icon when the severity prop is 'error'", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { severity: "error" }
  })

  expect(wrapper.get("[data-testid='icon-wrapper']").text()).toBe("ph:warning-fill")
})

it("should use the correct icon when the severity prop is 'warning'", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { severity: "warning" }
  })

  expect(wrapper.get("[data-testid='icon-wrapper']").text()).toBe("ph:warning-circle-fill")
})

it("should use the correct icon when the severity prop is 'success'", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { severity: "success" }
  })

  expect(wrapper.get("[data-testid='icon-wrapper']").text()).toBe("ph:check-circle-fill")
})

it("should render the close button if the dismissable prop is true", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { dismissable: true }
  })

  expect(wrapper.get("[data-testid='button']").exists()).toBe(true)
})

it("should render the swap wrapper if the dismissedIn prop > 0", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { dismissable: true, dismissedIn: 1000 }
  })

  expect(wrapper.get("[data-testid='swap']").exists()).toBe(true)
})

it("should render the close icon if the dismissedIn prop === 0", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { dismissable: true, dismissedIn: 0 }
  })

  expect(wrapper.get("[data-testid='close-icon']").exists()).toBe(true)
})

it("should render the progress bar if the dismissable prop is false", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { dismissable: false, dismissedIn: 4000 }
  })

  expect(wrapper.get("[data-testid='progressbar']").exists()).toBe(true)
})

it("emits 'dismiss' after timeout if dismissedIn prop > 0", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { dismissable: true, dismissedIn: 10 }
  })

  await sleep(100)
  expect(wrapper.emitted("dismiss")).toHaveLength(1)
})

it("doesn't emit 'dismiss' after timeout if dismissedIn prop === 0", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { dismissable: true, dismissedIn: 0 }
  })

  await sleep(100)
  expect(wrapper.emitted("dismiss")).toBeUndefined()
})

it("emits 'dismiss' when clicked if dismissable is true", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { dismissable: true, dismissedIn: 0 }
  })

  wrapper.find("[data-testid='alert-item']").trigger("click")
  expect(wrapper.emitted("dismiss")).toHaveLength(1)
})

it("doesn't emit 'dismiss' when clicked if dismissable is false", async () => {
  const wrapper = await mountSuspended(AlertItem, {
    props: { dismissable: false, dismissedIn: 1000 }
  })

  wrapper.find("[data-testid='alert-item']").trigger("click")
  expect(wrapper.emitted("dismiss")).toBeUndefined()
})
