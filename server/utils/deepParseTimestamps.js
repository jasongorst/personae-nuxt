import { isArray, isPlainObject, map, mapValues } from "lodash-es"

export default function deepParseTimestamps(object) {
  if (isArray(object)) {
    return map(object, (element) => deepParseTimestamps(element))
  } else if (isPlainObject(object)) {
    return mapValues(object, (value, key) => {
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
