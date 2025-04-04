it("should transform the keys of the top-level object", () => {
  const obj = { a: 1, b: "two", c: [ 3 ] }
  const expected = { A: 1, B: "two", C: [ 3 ] }

  const converted = deepConvertKeys(obj, _upperCase)

  expect(_keys(converted)).toEqual(_keys(expected))
})

it("should transform the keys of objects nested in a top-level array", () => {
  const obj = { a: 1, b: "two", c: [ 3 ] }
  const expected = { A: 1, B: "two", C: [ 3 ] }

  const ary = [ obj, obj ]
  const converted = deepConvertKeys(ary, _upperCase)

  expect(_keys(converted[0])).toEqual(_keys(expected))
})

it("should transform the keys of objects nested in a top-level object", () => {
  const obj = { a: 1, b: "two", c: [ 3 ] }
  const expected = { A: 1, B: "two", C: [ 3 ] }

  const topObj = { x: obj, y: obj }
  const converted = deepConvertKeys(topObj, _upperCase)

  expect(_keys(converted.X)).toEqual(_keys(expected))
})
