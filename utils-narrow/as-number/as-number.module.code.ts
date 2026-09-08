export function asNumber(held: unknown): number | null {
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  if (typeof held !== "string" || held === "") return null
  const read = Number(held)
  return Number.isFinite(read) ? read : null
}
