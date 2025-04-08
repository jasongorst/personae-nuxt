import { registerEndpoint, mockComponent, mountSuspended } from "@nuxt/test-utils/runtime"
import { createTestingPinia } from "@pinia/testing"
import index from "~/pages/index.vue"

mockComponent("Icon", () => import("~~/test/mocks/Icon.mock.vue"))
mockComponent("CharacterRow", () => import("~~/test/mocks/CharacterRow.mock.vue"))
mockComponent("CharacterGrid", () => import("~~/test/mocks/CharacterGrid.mock.vue"))

const characters = [ { id: 1, player: "test1" } ]

registerEndpoint("/characters", () => characters)

it("should render", async () => {
  const wrapper = await mountSuspended(index)

  expect(wrapper).toBeDefined
})

describe("fetch characters from endpoint", async () => {
  let wrapper, personae

  beforeEach(async () => {
    wrapper = await mountSuspended(index, {
      global: {
        plugins: [ createTestingPinia() ]
      }
    })

    personae = usePersonae()
  })

  it("should fetch characters from endpoint", async () => {
    expect(personae.characters).toEqual(characters)
  })

  it("should render CharacterGrid with test character", async () => {
    await sleep(10)

    expect(wrapper.get("[data-testid='grid']")).toBeDefined()
    expect(wrapper.get("[data-testid='row_1']")).toBeDefined()
    expect(wrapper.get("[data-testid='player_test-1']")).toBeDefined()
  })
})

it("should render CharacterEmpty with empty characters", async () => {
  // return empty array from mocked endpoint
  registerEndpoint("/characters", () => [])

  const wrapper = await mountSuspended(index, {
    global: {
      plugins: [ createTestingPinia() ]
    }
  })

  const personae = usePersonae()

  expect(wrapper.get("[data-testid='empty']")).toBeDefined()
})
