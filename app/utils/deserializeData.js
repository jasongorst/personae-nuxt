export default function deserializeData(object) {
  const result = _mapKeys(object, (_, key) => _camelCase(key))
  return _mapValues(result, (value) => sentenceize(value))
}
