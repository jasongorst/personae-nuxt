export default definePayloadPlugin((nuxtApp) => {
  definePayloadReducer("Map", (value) => {
    if (_isMap(value)) {
      return [...value].toJSON
    }
    return _isMap(value) && JSON.stringify([...value])
  })

  definePayloadReviver("Map", (value) => {
    return new Map(JSON.parse(value))
  })
})
