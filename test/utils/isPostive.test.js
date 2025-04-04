it("should return true for number > 0", () => {
  expect(isPositive(1)).toBe(true)
})

it("should return false for 0", () => {
  expect(isPositive(0)).toBe(false)
})

it("should return false for number < 0", () => {
  expect(isPositive(-1)).toBe(false)
})

it("should return false for anything else", () => {
  expect(isPositive("foo")).toBe(false)
})
