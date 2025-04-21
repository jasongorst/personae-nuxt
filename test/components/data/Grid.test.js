import { mockComponent, mountSuspended } from "@nuxt/test-utils/runtime"
import DataGrid from "~/components/data/Grid.vue"

mockComponent("DataRow", () => import("~~/test/mocks/DataRow.mock.vue"))

const data = [
  { id: 1, player: "one", name: "foo" },
  { id: 2, player: "two", name: "bar" }
]

const fields = [ "id", "player", "name" ]

let wrapper

beforeEach(async () => {
  wrapper = await mountSuspended(DataGrid, {
    props: { data: data, fields: fields }
  })
})

it("should render", async () => {
  expect(wrapper.get("[data-testid='data-grid']").exists()).toBe(true)
})

it("should render a table header for each field", async () => {
  expect(wrapper.findAll("[data-testid='data-header']")).toHaveLength(3)
})

it("should render a row for each character", async () => {
  expect(wrapper.findAll("[data-testid='data-row']")).toHaveLength(2)
})

it("should emit 'sort' with attribute when a header is clicked", async () => {
  await wrapper.find("th:last-child").trigger("click")

  expect(wrapper.emitted()).toHaveProperty("sort")

  const sortEvent = wrapper.emitted("sort")
  expect(sortEvent).toHaveLength(1)
  expect(sortEvent[0]).toEqual([ "name" ])
})
