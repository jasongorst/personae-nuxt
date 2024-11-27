export default function compareAsc(attribute) {
  return ((a, b) => isBlank(a[attribute]) - isBlank(b[attribute]) || +(a[attribute] > b[attribute]) || -(a[attribute] < b[attribute]))
}
