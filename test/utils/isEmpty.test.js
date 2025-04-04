it("should return true for an empty string", () => {
  expect(isEmpty("")).toBe(true)
})

it("should return true for an empty array", () => {
  expect(isEmpty([])).toBe(true)
})

it("should return true for an empty set", () => {
  expect(isEmpty(new Set())).toBe(true)
})

it("should return true for an empty map", () => {
  expect(isEmpty(new Map())).toBe(true)
})

it("should return false for null", () => {
  expect(isEmpty(null)).toBe(false)
})

it("should return false for undefined", () => {
  expect(isEmpty(undefined)).toBe(false)
})

it("should return false for numbers", () => {
  expect(isEmpty(0)).toBe(false)
})

it("should return false for bigints", () => {
  expect(isEmpty(BigInt(Number.MAX_SAFE_INTEGER) + 1n)).toBe(false)
})

it("should return false for booleans", () => {
  expect(isEmpty(true)).toBe(false)
})

it("should return false for symbols", () => {
  expect(isEmpty(Symbol("foo"))).toBe(false)
})

it("should return false for objects", () => {
  expect(isEmpty({})).toBe(false)
})
