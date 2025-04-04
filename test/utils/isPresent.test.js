it("should return false for undefined", () => {
  expect(isPresent(undefined)).toBe(false)
})

it("should return false for null", () => {
  expect(isPresent(null)).toBe(false)
})

it("should return true for anything !isEmpty()", () => {
  expect(isPresent(0)).toBe(true)
})
