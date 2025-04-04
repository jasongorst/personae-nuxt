it("should return positive when a < b", () => {
  const [ a, b ] = [ { test: "a" }, { test: "b" } ]

  expect(compareDesc("test")(a,b)).toBeGreaterThan(0)
})

it("should return negative when a > b", () => {
  const [ a, b ] = [ { test: "b" }, { test: "a" } ]

  expect(compareDesc("test")(a,b)).toBeLessThan(0)
})

it("should return positive when a is blank", () => {
  const [ a, b ] = [ { test: "" }, { test: "a" } ]

  expect(compareDesc("test")(a,b)).toBeGreaterThan(0)
})

it("should return negative when b is blank", () => {
  const [ a, b ] = [ { test: "a" }, { test: "" } ]

  expect(compareDesc("test")(a,b)).toBeLessThan(0)
})
