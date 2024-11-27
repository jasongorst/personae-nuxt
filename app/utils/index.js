export const filterAttributes = [
  "player",
  "kith",
  "seeming",
  "location"
]

export const detailAttributes = [
  "player",
  "faeName",
  "mortalName",
  "kith",
  "house",
  "bannerhouse",
  "seeming",
  "rank",
  "location",
  "position"
]

export const richTextAttributes = [
  "description",
  "notes"
]

// for create/update, all detail and rich text attributes
export const apiAttributes = _concat(detailAttributes, richTextAttributes)

// for characterList, all detail attributes except house and bannerhouse
export const listAttributes = _difference(detailAttributes, ["house", "bannerhouse"])

// for datalist options in create/update, all detail attributes except fae name and mortal name
export const optionsAttributes = _difference(detailAttributes, ["faeName", "mortalName"])
