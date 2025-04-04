export default function deepJoinValues(object, separator = ",") {
  if (_isPlainObject(object)) {
    return _mapValues(object, (value) => deepJoinValues(value, separator))
  } else if (_isArray(object)) {
    if (_some(object, (value) => isArrayOrPlainObject(value))) {
      return _map(object, (value) => deepJoinValues(value, separator))
    } else {
      return _join(object, separator)
    }
  } else {
    return object
  }
}
