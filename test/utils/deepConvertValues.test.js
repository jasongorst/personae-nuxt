it("should transform elements of an array", () => {
  const ary = [ "a", "b" ]
  const expected = [ "A", "B" ]

  const converted = deepConvertValues(ary, _upperCase)

  expect(converted).toEqual(expected)
})

it("should transform elements in nested arrays", () => {
  const ary = [ "a", [ "b" ] ]
  const expected = [ "A", [ "B" ] ]

  const converted = deepConvertValues(ary, _upperCase)

  expect(converted).toEqual(expected)
})

it("should transform the values of an object", () => {
  const obj = { a: "a", b: "b" }
  const expected = { a: "A", b: "B" }

  const converted = deepConvertValues(obj, _upperCase)

  expect(converted).toEqual(expected)
})

it("should transform the values of an object nested in an array", () => {
  const obj = { a: "a", b: "b" }
  const ary = [ obj ]
  const expected = [ { a: "A", b: "B" } ]

  const converted = deepConvertValues(ary, _upperCase)

  expect(converted).toEqual(expected)
})

it("should transform the values of an object nested in another object", () => {
  const obj = { a: "a", b: "b" }
  const topObj = { x: obj }
  const expected = { x: { a: "A", b: "B" } }

  const converted = deepConvertValues(topObj, _upperCase)

  expect(converted).toEqual(expected)
})
