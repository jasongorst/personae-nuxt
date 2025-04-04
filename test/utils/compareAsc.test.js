it("should return negative when a < b", () => {
  const [ a, b ] = [ { test: "a" }, { test: "b" } ]

  expect(compareAsc("test")(a,b)).toBeLessThan(0)
})

it("should return positive when a > b", () => {
  const [ a, b ] = [ { test: "b" }, { test: "a" } ]

  expect(compareAsc("test")(a,b)).toBeGreaterThan(0)
})

it("should return positive when a is blank", () => {
  const [ a, b ] = [ { test: "" }, { test: "a" } ]

  expect(compareAsc("test")(a,b)).toBeGreaterThan(0)
})

it("should return negative when b is blank", () => {
  const [ a, b ] = [ { test: "a" }, { test: "" } ]

  expect(compareAsc("test")(a,b)).toBeLessThan(0)
})
