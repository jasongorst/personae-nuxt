it("should return true for undefined", () => {
  expect(isBlank(undefined)).toBe(true)
})

it("should return true for null", () => {
  expect(isBlank(null)).toBe(true)
})

it("should return true for anything !isPresent()", () => {
  expect(isBlank("")).toBe(true)
})

it("should return false for anything else", () => {
  expect(isBlank(0)).toBe(false)
})
