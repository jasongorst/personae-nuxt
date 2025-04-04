it("should end with a '.'", () => {
  expect(sentenceize("foo")).toMatch(/\.$/)
})

it("should capitalize the first letter", () => {
  expect(sentenceize("foo")).toMatch(/^[A-Z]/)
})

it("should lowercase the remaining letters", () => {
  expect(sentenceize("FOO")).toMatch(/.[a-z]*?/)
})
