import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import AlertMessages from "~/components/alert/Messages.vue"

const mockAlert = {
  messages: new Map([
    [
      1,
      {
        text: "foo",
        severity: "info",
        dismissable: true,
        dismissedIn: 0,
        dismissOnLeave: false
      }
    ]
  ])
}

mockNuxtImport("useAlert", () => (() => mockAlert))

it("should render", async () => {
  const wrapper = await mountSuspended(AlertMessages)

  expect(wrapper).toBeDefined()
})
