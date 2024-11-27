export default function classListToArray(classList) {
  if (_isString(classList)) {
    return classList.split(" ")
  } else if (_isArray(classList)) {
    return classList
  } else {
    console.error(`can't cast ${classList} as an array of class names`)

    throw TypeError(`can't cast ${classList} as an array of class names`)
  }
}
