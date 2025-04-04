import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import CharacterEmpty from "~/components/character/Empty.vue"

const { usePersonaeMock } = vi.hoisted(() => {
  return {
    usePersonaeMock: vi.fn(() => {})
  }
})

mockNuxtImport("usePersonae", () => usePersonaeMock)

it("should render", async () => {
  const wrapper = await mountSuspended(CharacterEmpty)

  expect(wrapper.get("[data-testid='empty']")).toBeDefined()
})

it("should show empty message for query and filter", async () => {
  usePersonaeMock.mockImplementation(() => {
    return {
      isFilterSet: ref(true),
      query: ref("test")
    }
  })

  const wrapper = await mountSuspended(CharacterEmpty)

  expect(wrapper.get("[data-testid='query-filter']")).toBeDefined()
})

it("should show empty message for query and no filter", async () => {
  usePersonaeMock.mockImplementation(() => {
    return {
      isFilterSet: ref(false),
      query: ref("test")
    }
  })

  const wrapper = await mountSuspended(CharacterEmpty)

  expect(wrapper.get("[data-testid='query-nofilter']")).toBeDefined()
})

it("should show empty message for query and no filter", async () => {
  usePersonaeMock.mockImplementation(() => {
    return {
      isFilterSet: ref(true),
      query: ref("")
    }
  })

  const wrapper = await mountSuspended(CharacterEmpty)

  expect(wrapper.get("[data-testid='noquery-filter']")).toBeDefined()
})