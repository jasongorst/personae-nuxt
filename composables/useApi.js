export function useApi(path) {
  return $fetch(`/api/v1/${path}`)
}
