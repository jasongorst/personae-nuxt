export default function includesKeys(obj, keys) {
  // true if all elements of `keys` are properties of `obj`
  return _every(keys, (key) => _includes(_keys(obj), key))
}
