import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import FilterSummary from "~/components/filter/Summary.vue"

const mockPersonae = {
  filter: ref({
    player: [ "one", "two" ],
    name: [ "a" ]
  }),

  isFilterSet: ref(true),
  removeFilter: () => {}
}

const removeFilterSpy = vi.spyOn(mockPersonae, "removeFilter")
mockNuxtImport("usePersonae", () => (() => mockPersonae))

let wrapper

beforeEach(async () => {
  wrapper = await mountSuspended(FilterSummary)
})

it("should render", async () => {
  expect(wrapper.get("[data-testid='summary']").exists()).toBe(true)
})

it("should render all attribute values in the filter", async () => {
  expect(wrapper.findAll("[data-testid='value']")).toHaveLength(3)
})

it("should call removeFilter when a button is clicked", async () => {
  const removeButton = wrapper.get("[data-testid='button']")
  await removeButton.trigger("click")

  expect(removeFilterSpy).toHaveBeenCalledExactlyOnceWith("player", "one")
})
