export function stringIn(value: unknown): string | null {
  return typeof value === "string" ? value : null
}
