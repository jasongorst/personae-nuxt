export default function deepJoinArrays(object, separator = ",") {
  if (_isPlainObject(object)) {
    return _mapValues(object, (value) => deepJoinArrays(value, separator))
  } else if (_isArray(object)) {
    if (_some(object, (value) => isArrayOrPlainObject(value))) {
      return _map(object, (value) => deepJoinArrays(value, separator))
    } else {
      return _join(object, separator)
    }
  } else {
    return object
  }
}
