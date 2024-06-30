export default function sentenceizeValues(object) {
  return deepJoinArrays(
    deepConvertValues(object, sentenceize),
    " "
  )
}
