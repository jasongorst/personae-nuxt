export default function isArrayOrPlainObject(object) {
  return _isArray(object) || _isPlainObject(object)
}
