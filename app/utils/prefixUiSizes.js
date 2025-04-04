export default function prefixUiSizes(prefix) {
  return _fromPairs(
    _map(
      uiSizes,
      (size) => [ size, _join([ prefix, size ], "-") ]
    )
  )
}
