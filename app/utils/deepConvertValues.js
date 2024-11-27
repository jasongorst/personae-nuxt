export default function deepConvertValues(object, converter) {
  if (_isArray(object)) {
    return _map(object, (element) => deepConvertValues(element, converter))
  } else if (_isPlainObject(object)) {
    return _mapValues(object, (value) => deepConvertValues(value, converter))
  } else {
    return converter(object)
  }
}
