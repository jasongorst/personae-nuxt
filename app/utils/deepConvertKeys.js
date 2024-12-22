export default function deepConvertKeys(object, converter) {
  if (_isArray(object)) {
    return _map(object, (element) => deepConvertKeys(element, converter))
  } else if (_isPlainObject(object)) {
    return _mapValues(
      convertKeys(object, converter),
      (value) => deepConvertKeys(value, converter)
    )
  } else {
    return object
  }
}
