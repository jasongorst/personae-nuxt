import { registerEndpoint, mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import edit from "~/pages/edit-[id].vue"

mockNuxtImport("detailAttributes", () => {
  return [ "player", "name" ]
})

mockNuxtImport("richTextAttributes", () => {
  return [ "text" ]
})

registerEndpoint("/characters/1", () => {
  return {
    id: 1,
    player: "test",
    name: "foo",
    text: "<p>lorum ipsum</p>"
  }
})

it("should render", async () => {
  const wrapper = await mountSuspended(edit, { route: "/edit-1" })

  expect(wrapper.get("[data-testid='edit']")).toBeDefined
})
