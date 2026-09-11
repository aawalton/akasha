export function instantIn(value: unknown): number | null {
  if (typeof value === "number") return Number.isNaN(value) ? null : value
  if (typeof value === "string") {
    const ms = Date.parse(value)
    return Number.isNaN(ms) ? null : ms
  }
  return null
}
