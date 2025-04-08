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
  expect(wrapper).toBeDefined()
})

it("should render inputs for attributes", async () => {
  expect(wrapper.get("[data-testid='input_email']")).toBeDefined()
  expect(wrapper.get("[data-testid='input_password']")).toBeDefined()
  expect(wrapper.get("[data-testid='input_status']")).toBeDefined()
  expect(wrapper.get("[data-testid='input_admin']")).toBeDefined()
})