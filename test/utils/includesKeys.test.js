it("should return true for an empty array", () => {
  expect(includesKeys({ one: 1 }, [])).toBe(true)
})

it("should return true for an object with one key that's in the array", () => {
  expect(includesKeys({ one: 1 }, [ "one" ])).toBe(true)
})

it("should return true for an object with many keys where one is in the array", () => {
  expect(includesKeys({ one: 1, two: 2 }, [ "one" ])).toBe(true)
})

it("should return true for an object with many keys where all are in the array", () => {
  expect(includesKeys({ one: 1, two: 2 }, [ "one", "two" ])).toBe(true)
})

it("should return false for an empty object and a non-empty array", () => {
  expect(includesKeys({}, [ "one" ])).toBe(false)
})

it("should return false for an object with one key and an array with a non-matching key", () => {
  expect(includesKeys({ one: 1 }, [ "two" ])).toBe(false)
})

it("should return false for an object with many keys where only some are in the array", () => {
  expect(includesKeys({ one: 1, two: 2 }, [ "one", "two", "three" ])).toBe(false)
})
