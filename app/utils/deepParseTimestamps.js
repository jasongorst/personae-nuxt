export default function deepParseTimestamps(object) {
  if (_isArray(object)) {
    return _map(object, (element) => deepParseTimestamps(element))
  } else if (_isPlainObject(object)) {
    return _mapValues(object, (value, key) => {
      if (["createdAt", "updatedAt"].includes(key)) {
        return Date.parse(value)
      } else {
        return value
      }
    })
  } else {
    return object
  }
}
