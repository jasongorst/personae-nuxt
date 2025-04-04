it("should return an object with the same values", () => {
  const obj = { a: 1, b: "two", c: [ 3 ] }

  // the lodash _identity() function just returns the attribute its given
  expect(_values(convertKeys(obj, _identity))).toEqual(_values(obj))
})

it("should transform an object's keys using the converter", () => {
  const obj = { a: 1, b: "two", c: [ 3 ] }
  const expected = { A: 1, B: "two", C: [ 3 ] }

  expect(_keys(convertKeys(obj, _upperCase))).toEqual(_keys(expected))
})
