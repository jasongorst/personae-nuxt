export function useApiCall(
  url,
  {
    manualFetch = false,
    beforeCb = () => {},
    successCb = () => {},
    fieldErrorCb = () => {},
    apiErrorCb = () => {},
    fetchErrorCb = () => {},
    ...fetchOptions
  } = {}
) {
  const options = {
    onRequest: async ({ request, options }) => {
      //console.log("[useFetch request]")
      //console.dir(request, { colors: true })
      //console.dir(options, { colors: true })

      await beforeCb()
    },

    onRequestError: async ({ error }) => {
      //console.log("[useFetch request error]")
      //console.dir(error, { colors: true })

      await fetchErrorCb(error)
    },

    onResponse: async ({ response }) => {
      //console.log("[useFetch response]")
      //console.dir(response, { colors: true })

      if (response.ok) {
        await successCb(response)
      }
    },

    onResponseError: async ({ response }) => {
      //console.log("[useFetch response error]")
      //console.dir(response, { colors: true })
      //console.dir(response.error, { colors: true })

      if (
        _has(response._data, "fieldError") ||
        (response.status === 422)
      ) {
        await fieldErrorCb(response)
      } else {
        await apiErrorCb(response)
      }
    },

    transform: (data) => deepConvertKeys(data, _camelCase)
  }

  if (manualFetch) {
    options.immediate = false
    options.watch = false
  }

  // assign fetchOptions properties to options (with overwriting)
  _assign(options, fetchOptions)

  return useFetch(url, options)
}
