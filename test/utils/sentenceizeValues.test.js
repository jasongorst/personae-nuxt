it("should match the snapshot", () => {
  const ary = [ "User Error", "and you look funny" ]

  expect(sentenceizeValues(ary)).toMatchInlineSnapshot(`"User error. And you look funny."`)
})
