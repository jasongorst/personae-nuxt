import { mountSuspended } from "@nuxt/test-utils/runtime"
import create from "~/pages/dashboard/account/create.vue"

it("should render", async () => {
  const wrapper = await mountSuspended(create)

  expect(wrapper.get("[data-testid='account-create']")).toBeDefined
})
