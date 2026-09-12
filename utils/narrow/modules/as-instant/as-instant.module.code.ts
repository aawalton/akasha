export function asInstant(held: unknown): number | null {
  if (typeof held !== "string" || held === "") return null
  const read = Date.parse(held)
  return Number.isFinite(read) ? read : null
}
