import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import CharacterToolbar from "~/components/character/Toolbar.vue"

const { usePersonaeMock } = vi.hoisted(() => {
  return {
    usePersonaeMock: vi.fn(() => {
      return {
        filteredCount: ref(1),
        totalCount: ref(2)
      }
    })
  }
})

mockNuxtImport("usePersonae", () => usePersonaeMock)

it("should render", async () => {
  const wrapper = await mountSuspended(CharacterToolbar)

  expect(wrapper).toBeDefined()
})

it("should show filtered and total character counts", async () => {
  const wrapper = await mountSuspended(CharacterToolbar)

  expect(wrapper.get("[data-testid='count']").text()).toContain("1 of 2 characters")
})

it("should show filtered and total search results count with query", async () => {
  usePersonaeMock.mockImplementation(() => {
    return {
      filteredCount: ref(1),
      totalCount: ref(2),
      query: ref("test")
    }
  })

  const wrapper = await mountSuspended(CharacterToolbar)

  expect(wrapper.get("[data-testid='count']").text()).toContain("1 of 2 search result")
})