import { setActivePinia, createPinia, storeToRefs } from "pinia"

const oneCharacter = [ { id: 1, player: "test" } ]

const threeCharacters = [
  { id: 1, player: "test1" },
  { id: 2, player: "test1" },
  { id: 3, player: "test2" }
]

const unsortedCharacters = [
  { id: 1, player: "test2" },
  { id: 2, player: "test3" },
  { id: 3, player: "test1" }
]

let personae, characters

beforeEach(() => {
  setActivePinia(createPinia())
  personae = usePersonae()
  // normally this would use destructuring, i.e., { characters } = storeToRefs(personae)
  // but the syntax gets weird without a const or let
  characters = storeToRefs(personae)["characters"]
})

it("should initialize state", () => {
  expect(personae.characters).toEqual([])
  expect(personae.filter).toEqual(getBlankFilter())
  expect(personae.query).toBe("")
})

describe("usePersonae actions", () => {
  it("should add a filter", () => {
    personae.addFilter("player", "test")

    expect(personae.filter.player).toEqual([ "test" ])
  })

  it("should remove a filter", () => {
    personae.addFilter("player", "test1")
    personae.addFilter("player", "test2")
    personae.removeFilter("player", "test1")

    expect(personae.filter.player).toEqual([ "test2" ])
  })

  it("should clear a filter attribute", () => {
    personae.addFilter("player", "test")
    personae.clearFilterAttribute("player")

    expect(personae.filter.player).toEqual([])
  })

  it("should clear the filter", () => {
    personae.addFilter("player", "test")
    personae.clearFilter()

    expect(personae.filter).toEqual(getBlankFilter())
  })
})

describe("usePersonae getters", () => {
  it("should get totalCount === 0 at init", () => {
    expect(personae.totalCount).toBe(0)
  })

  it("should get totalCount === 1 with one character", () => {
    characters.value = oneCharacter

    expect(personae.totalCount).toBe(1)
  })

  it("should get isLoaded === false at init", () => {
    expect(personae.isLoaded).toBe(false)
  })

  it("should get isLoaded === true with one character", () => {
    characters.value = oneCharacter

    expect(personae.isLoaded).toBe(true)
  })

  it("should get isFilterSet === false at init", () => {
    expect(personae.isFilterSet).toBe(false)
  })

  it("should get isFilterSet === true after addFilter()", () => {
    personae.addFilter("player", "test")

    expect(personae.isFilterSet).toBe(true)
  })

  it("should get the correct value for filteredCharacters", () => {
    characters.value = threeCharacters
    personae.addFilter("player", "test1")

    expect(personae.filteredCharacters).toEqual([
      { id: 1, player: "test1" },
      { id: 2, player: "test1" }
    ])
  })

  it("should get the correct value for filteredCount", () => {
    characters.value = threeCharacters
    personae.addFilter("player", "test1")

    expect(personae.filteredCount).toBe(2)
  })
})

describe("usePersonae sortCharacters()", () => {
  beforeEach(() => {
    characters.value = unsortedCharacters
  })

  it("should sort ascending", () => {
    personae.sortCharacters("player", "asc")

    expect(characters.value).toEqual([
      { id: 3, player: "test1" },
      { id: 1, player: "test2" },
      { id: 2, player: "test3" }
    ])
  })

  it("should sort descending", () => {
    personae.sortCharacters("player", "desc")

    expect(characters.value).toEqual([
      { id: 2, player: "test3" },
      { id: 1, player: "test2" },
      { id: 3, player: "test1" }
    ])
  })
})