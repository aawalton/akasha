export function camelizeKey(key: string): string {
  const segments = key.split(/[^A-Za-z0-9]+/).filter((s) => s.length > 0)
  const [first, ...rest] = segments
  if (first === undefined) return ""
  const head = first.charAt(0).toLowerCase() + first.slice(1)
  return head + rest.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("")
}

export function kebabizeKey(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}
