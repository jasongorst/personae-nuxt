export default function isEmpty(value) {
  // true if value is empty (as defined by type)
  // NOTE: numbers, bigints, booleans, and symbols are never empty

  switch (type(value)) {
    case "string":
      return (value === "")
    case "Array":
      return (value.length === 0)
    case "Set":
    case "Map":
      return (value.size === 0)
    default:
      return false
  }
}
