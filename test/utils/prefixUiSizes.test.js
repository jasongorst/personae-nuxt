import { mockNuxtImport } from "@nuxt/test-utils/runtime"

mockNuxtImport("uiSizes", () => [ "a", "b" ])

it("should return an object with keys being the elements of uiSizes", () => {
  expect(_keys(prefixUiSizes("foo"))).toEqual([ "a", "b" ])
})

it("should return an object with values like prefix-size", () => {
  const expected = { a: "foo-a", b: "foo-b" }

  expect(prefixUiSizes("foo")).toEqual(expected)
})
