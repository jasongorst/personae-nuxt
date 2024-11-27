export default function prefersDarkColorScheme() {
  return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
}
