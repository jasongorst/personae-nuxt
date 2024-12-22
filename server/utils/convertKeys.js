import { mapKeys } from "Lodash-es"

export default function convertKeys(object, converter) {
  return mapKeys(
    object,
    (_, key) => converter(key)
  )
}
