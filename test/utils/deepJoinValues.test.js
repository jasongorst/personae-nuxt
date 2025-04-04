it("should join a flat array", () => {
  const ary = [ "one", "two" ]
  expect(deepJoinValues(ary)).toBe(_join(ary))
})

it("should join a nested array", () => {
  const nestedAry = [ "one", [ "two", "three" ] ]
  expect(deepJoinValues(nestedAry)).toEqual([ nestedAry[0], _join(_tail(nestedAry), ",") ])
})

it("should join values of an object", () => {
  const obj = { a: [ "one", "two" ] }
  expect(deepJoinValues(obj)).toEqual({ a: _join(obj.a) })
})

it("should join values of a nested object", () => {
  const nestedObj = { a: { b: [ "one", "two" ] } }
  expect(deepJoinValues(nestedObj)).toEqual({ a: { b: _join(nestedObj.a.b) } })
})

it("should return unaltered non-array non-plain-object values", () => {
  const obj = { a: 1 }
  expect(deepJoinValues(obj)).toEqual(obj)
})