import { mockComponent, mountSuspended } from "@nuxt/test-utils/runtime"
import DataTable from "~/components/data/Table.vue"

mockComponent("DataGrid", () => import("~~/test/mocks/DataGrid.mock.vue"))
mockComponent("DataToolbar", () => import("~~/test/mocks/DataToolbar.mock.vue"))

const data = [ { id: 1 } ]
const fields = [ "id" ]

it("should render DataSkeleton with empty data", async () => {
  const wrapper = await mountSuspended(DataTable, {
    props: { data: [], fields: fields }
  })

  expect(wrapper.get("[data-testid='data-skeleton']").exists()).toBe(true)
})

it("should render DataGrid and DataToolbar with data", async () => {
  const wrapper = await mountSuspended(DataTable, {
    props: { data: data, fields: fields }
  })

  expect(wrapper.get("[data-testid='data-grid']").exists()).toBe(true)
  expect(wrapper.get("[data-testid='data-toolbar']").exists()).toBe(true)
})
