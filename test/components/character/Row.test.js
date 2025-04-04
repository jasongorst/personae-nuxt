import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import CharacterRow from "~/components/character/Row.vue"

mockNuxtImport("listAttributes", () => [ "player", "name" ])

let wrapper

beforeEach(async () => {
  wrapper = await mountSuspended(CharacterRow, {
    props: { character: { id: 1, player: "one", name: "a" } }
  })
})

it("should render", async () => {
  expect(wrapper).toBeDefined()
})

it("should render the character attributes", async () => {
  expect(wrapper.get("[data-testid='player_one']").text()).toBe("one")
})
