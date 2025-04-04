export default function getBlankFilter() {
  return _fromPairs(
    filterAttributes.map(
      (attribute) => [ attribute, [] ]
    )
  )
}