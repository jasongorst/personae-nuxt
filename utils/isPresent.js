export default function isPresent(element) {
  return (!_isUndefined(element) && !_isNull(element) && !isEmpty(element))
}
