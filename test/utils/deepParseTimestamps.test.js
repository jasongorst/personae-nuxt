it("should parse values of 'createdAt' and 'updatedAt' keys", () => {
  const obj = {
    createdAt: "2025-01-01T01:00:01.234Z",
    updatedAt: "2025-01-01T02:00:03.456Z"
  }

  const expected = {
    createdAt: 1735693201234,
    updatedAt: 1735696803456
  }

  const converted = deepParseTimestamps(obj)
  expect(converted).toEqual(expected)
})

it("should not parse values of other keys", () => {
  const obj = {
    a: "2025-01-01T01:00:01.234Z",
    b: "foo"
  }

  const converted = deepParseTimestamps(obj)
  expect(converted).toEqual(obj)
})

it("should parse objects in an array", () => {
  const obj = { createdAt: "2025-01-01T01:00:01.234Z" }
  const ary = [ obj ]

  const expected = [ { createdAt: 1735693201234 } ]

  const converted = deepParseTimestamps(ary)
  expect(converted).toEqual(expected)
})

it("should parse nested objects", () => {
  const obj = { createdAt: "2025-01-01T01:00:01.234Z" }
  const topObj = { a: obj, b: "foo" }

  const expected = { a: { createdAt: 1735693201234 }, b: "foo" }

  const converted = deepParseTimestamps(topObj)
  expect(converted).toEqual(expected)
})