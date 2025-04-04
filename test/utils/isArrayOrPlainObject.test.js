it("should return true for an array", () => {
  expect(isArrayOrPlainObject([])).toBe(true)
})

it("should return true for a plain object", () => {
  expect(isArrayOrPlainObject({})).toBe(true)
})

it("should return false for a non-array literal", () => {
  expect(isArrayOrPlainObject("")).toBe(false)
})

it("should return false for an object with a non-null prototype", () => {
  expect(isArrayOrPlainObject(new Date())).toBe(false)
})
