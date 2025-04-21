import { registerEndpoint, mountSuspended } from "@nuxt/test-utils/runtime"
import index from "~/pages/dashboard/account/index.vue"

const accounts = [
  { id: 1, email: "test1@example.com", status: "verified", admin: true },
  { id: 2, email: "test2@example.com", status: "unverified", admin: false },
  { id: 3, email: "test3@example.com", status: "closed", admin: false }
]

registerEndpoint("/accounts", () => accounts)

let wrapper

beforeEach(async () => {
  wrapper = await mountSuspended(index)
})

it("should render", async () => {
  expect(wrapper).toBeDefined
})

it("should render account grid with test accounts", async () => {
  expect(wrapper.get("[data-testid='data-grid']").exists()).toBe(true)
  expect(wrapper.findAll("[data-testid='data-row']")).toHaveLength(3)
})

it("should render account toolbar with count", async () => {
  expect(wrapper.get("[data-testid='data-toolbar']").text()).toContain("3 accounts")
})
