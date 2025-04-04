import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import FilterList from "~/components/filter/List.vue"

const mockPersonae = {
  characters: ref([
    { id: 1, player: "one", name: "a" },
    { id: 2, player: "two", name: "b" }
  ]),

  filteredCharacters: ref([
    { id: 1, player: "one", name: "a" }
  ]),

  filter: ref(getBlankFilter()),
  isFilterSet: ref(false)
}

mockNuxtImport("usePersonae", () => (() => mockPersonae))
mockNuxtImport("filterAttributes", () => [ "player", "name" ])

let wrapper

beforeEach(async () => {
  wrapper = await mountSuspended(FilterList)
})

it("should render", async () => {
  expect(wrapper).toBeDefined
})

describe("filter menus", async () => {
  let attributes

  beforeEach(async () => {
    attributes = wrapper.findAll("[data-testid='attribute']")
  })

  it("should render the contents of 'filterAttributes' as menus", async () => {
    expect(attributes).toHaveLength(2)
  })

  it("should render each attribute as a menu title", async () => {
    expect(attributes[0].get("[data-testid='title']").text()).toBe("player")
  })

  it("should render the values of each attribute", async () => {
    expect(attributes[0].findAll("[data-testid='value']")).toHaveLength(2)
  })

  it("should not show the clear button if no values are checked", async () => {
    expect(attributes[0].find("[data-testid='clear']").exists()).toBe(false)
  })

  it("should show the clear button if a value is checked", async () => {
    const checkbox = attributes[0].find("[data-testid='checkbox']")
    await checkbox.setValue()

    expect(attributes[0].get("[data-testid='clear']")).toBeDefined()
  })
})
