it("should return 'null' for null", () => {
  expect(checkType(null)).toBe("null")
})

it("should return 'boolean' for a Boolean", () => {
  expect(checkType(true)).toBe("boolean")
})

it("should return 'number' for a Number", () => {
  expect(checkType(0)).toBe("number")
})

it("should return 'bigint' for a BigInt", () => {
  expect(checkType(1n)).toBe("bigint")
})

it("should return 'string' for a String", () => {
  expect(checkType("")).toBe("string")
})

it("should return 'symbol' for a Symbol", () => {
  expect(checkType(Symbol("foo"))).toBe("symbol")
})

// mock class
class Mock {
  constructor() { }
}

it("should return 'class' for a class", () => {
  expect(checkType(Mock)).toBe("class")
})

it("should return the name of an object's class", () => {
  const aMockInstance = new Mock()
  expect(checkType(aMockInstance)).toBe("Mock")
})
