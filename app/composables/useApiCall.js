export function useApiCall(
  url,
  {
    manual = false,
    beforeCb = _noop,
    successCb = _noop,
    fieldErrorCb = _noop,
    apiErrorCb = _noop,
    fetchErrorCb = _noop,
    ...additionalOptions
  } = {}
) {
  const useFetchOptions = {
    onRequest: [
      // merge options from useApiCall
      ({ options }) => {
        if (toValue(manual)) {
          options.immediate = false
          options.watch = false
        }

        // merge additional options passed to useApiCall
        _merge(options, additionalOptions)
      },

      // user callback
      async () => await beforeCb(),
    ],

    onRequestError: async ({ error }) => {
      await fetchErrorCb(error)
    },

    onResponse: async ({ response }) => {
      if (response.ok) {
        await successCb(response)
      }
    },

    onResponseError: async ({ response }) => {
      if (_has(response._data, "fieldError") || (response.status === 422)) {
        await fieldErrorCb(response)
      } else {
        await apiErrorCb(response)
      }
    },

    transform: (response) => deepConvertKeys(response, _camelCase)
  }

  return useFetch(url, useFetchOptions)
}
