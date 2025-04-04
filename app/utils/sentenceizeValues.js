export default function sentenceizeValues(object) {
  return deepJoinValues(deepConvertValues(object, sentenceize), " ")
}
