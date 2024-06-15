export default function elementWithChildren(element, callback) {
  if (element.children) {
    for (const child of element.children) {
      callback(child)
      withChildren(child, callback)
    }
  }
}
