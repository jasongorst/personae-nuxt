export default function setJSONCookie(key, value) {
  document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}`
}
