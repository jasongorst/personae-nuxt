import { registerEndpoint, mountSuspended } from "@nuxt/test-utils/runtime"
import edit from "~/pages/dashboard/account/edit-[id].vue"


registerEndpoint("/accounts/1", () => {
  return {
    id: 1,
    email: "test",
    password: "foo",
    status: "verified",
    admin: true
  }
})

it("should render", async () => {
  const wrapper = await mountSuspended(edit, { route: "/dashboard/account/edit-1" })

  expect(wrapper.get("[data-testid='account-edit']")).toBeDefined
})
