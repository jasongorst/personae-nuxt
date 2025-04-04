import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import CharacterForm from "~/components/character/Form.vue"

mockNuxtImport("detailAttributes", () => [ "player", "name" ])
mockNuxtImport("richTextAttributes", () => [ "text" ])

let wrapper

beforeEach(async () => {
  wrapper = await mountSuspended(CharacterForm, {
    props: {
      modelValue: {
        id: 1,
        player: "test",
        name: "foo",
        text: "<p>lorum ipsum</p>"
      }
    }
  })
})

it("should render", async () => {
  expect(wrapper).toBeDefined()
})

it("should render inputs for detailAttributes", async () => {
  expect(wrapper.get("[data-testid='input_player']")).toBeDefined()
  expect(wrapper.get("[data-testid='input_name']")).toBeDefined()
})

it("should render trix inputs for richTextAttributes", async () => {
  expect(wrapper.get("[data-testid='trix_text']")).toBeDefined()
})