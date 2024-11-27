export default function compareDesc(attribute) {
  return ((a, b) => isBlank(a[attribute]) - isBlank(b[attribute]) || -(a[attribute] > b[attribute]) || +(a[attribute] < b[attribute]))
}
