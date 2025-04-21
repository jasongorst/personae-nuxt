import { mountSuspended } from "@nuxt/test-utils/runtime"
import DataToolbar from "~/components/data/Toolbar.vue"

const count = 2
const name = "foo"
const createUrl = "/"
let wrapper

beforeEach(async () => {
  wrapper = await mountSuspended(DataToolbar, {
    props: { count: count, name: name, createUrl: createUrl }
  })
})

it("should render", async () => {
  expect(wrapper.get("[data-testid='data-toolbar']").exists()).toBe(true)
})

it("should render the count", async () => {
  expect(wrapper.get("[data-testid='count']").exists()).toBe(true)
  expect(wrapper.get("[data-testid='count']").text()).toContain("2")
})

it("should render the plural name", async () => {
  expect(wrapper.get("[data-testid='count']").text()).toContain("foos")
})

it("should render the create url", async () => {
  expect(wrapper.get("[data-testid='link']").exists()).toBe(true)
  expect(wrapper.get("[data-testid='link']").attributes("href")).toBe("/")
})
