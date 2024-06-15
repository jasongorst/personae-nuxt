export default function getJSONCookie(key) {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`))
    ?.split("=")[1]

  if ((typeof value !== "undefined") && isPresent(value)) {
    return JSON.parse(decodeURIComponent(value))
  } else {
    return null
  }
}
