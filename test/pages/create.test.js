import { registerEndpoint, mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import create from "~/pages/create.vue"

it("should render", async () => {
  const wrapper = await mountSuspended(create)

  expect(wrapper.get("[data-testid='create']")).toBeDefined
})
