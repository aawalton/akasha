export function parseNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined
}
