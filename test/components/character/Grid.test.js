import { mockComponent, mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import CharacterGrid from "~/components/character/Grid.vue"

mockComponent("Icon", () => import("~~/test/mocks/Icon.mock.vue"))
mockComponent("CharacterRow", () => import("~~/test/mocks/CharacterRow.mock.vue"))
mockNuxtImport("listAttributes", () => [ "player", "name" ])

const mockPersonae = {
  filteredCharacters: [
    { id: 1, player: "one", name: "a" },
    { id: 2, player: "two", name: "b" }
  ],

  sortCharacters: () => {}
}

const sortCharactersSpy = vi.spyOn(mockPersonae, "sortCharacters")
mockNuxtImport("usePersonae", () => (() => mockPersonae))

let wrapper

beforeEach(async () => {
  sortCharactersSpy.mockReset()
  wrapper = await mountSuspended(CharacterGrid)
})

it("should render", async () => {
  expect(wrapper.get("[data-testid='grid']").exists()).toBe(true)
})

it("should render 2 CharacterRows", async () => {
  expect(wrapper.findAll("[data-testid^='row']")).toHaveLength(2)
})

it("should call sortCharacters with attribute and 'asc' when header is clicked", async () => {
  await wrapper.find("[data-testid='player']").trigger("click")

  expect(sortCharactersSpy).toHaveBeenCalledExactlyOnceWith("player", "asc")
})

it("should call sortCharacters with attribute and 'desc' when header is clicked twice", async () => {
  const th = wrapper.find("[data-testid='player']")
  _times(2, async () => await th.trigger("click"))

  expect(sortCharactersSpy).toHaveBeenCalledTimes(2)
  expect(sortCharactersSpy).toHaveBeenLastCalledWith("player", "desc")
})


it("should call sortCharacters with defaults when header is clicked three times", async () => {
  const th = wrapper.find("[data-testid='player']")
  _times(3, async () => await th.trigger("click"))

  expect(sortCharactersSpy).toHaveBeenCalledTimes(3)
  expect(sortCharactersSpy).toHaveBeenLastCalledWith("createdAt", "asc")
})

it("should show ascending sort icon when header is clicked", async () => {
  await wrapper.find("[data-testid='player']").trigger("click")

  expect(wrapper.get("[data-testid='icon']").text()).toBe("ph:sort-ascending-bold")
})

it("should show descending sort icon when header is clicked twice", async () => {
  const th = wrapper.find("[data-testid='player']")
  // noinspection ES6RedundantAwait
  await _times(2, async () => await th.trigger("click"))

  expect(wrapper.get("[data-testid='icon']").text()).toBe("ph:sort-descending-bold")
})

it("should show no sort icon when header is clicked three times", async () => {
  const th = wrapper.find("[data-testid='player']")
  // noinspection ES6RedundantAwait
  await _times(3, async () => await th.trigger("click"))

  expect(wrapper.find("[data-testid='icon']").exists()).toBe(false)
})
