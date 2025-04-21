import { mountSuspended } from "@nuxt/test-utils/runtime"
import AccountForm from "~/components/account/Form.vue"

let wrapper

beforeEach(async () => wrapper = await mountSuspended(AccountForm, {
  props: {
    modelValue: {
      id: 1,
      email: "test1@example.com",
      status: "verified",
      admin: true
    }
  }
}))

it("should render", async () => {
  expect(wrapper.get("[data-testid='account-form']").exists()).toBe(true)
})

it("should render inputs for attributes", async () => {
  expect(wrapper.get("[data-testid='input_email']").exists()).toBe(true)
  expect(wrapper.get("[data-testid='input_password']").exists()).toBe(true)
  expect(wrapper.get("[data-testid='input_status']").exists()).toBe(true)
  expect(wrapper.get("[data-testid='input_admin']").exists()).toBe(true)
})