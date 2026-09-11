export function isTable(value: unknown): value is Record<string | number, unknown> {
  return type(value) === "table"
}
