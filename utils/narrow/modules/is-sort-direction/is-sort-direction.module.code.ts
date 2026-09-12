export function isSortDirection(value: unknown): value is "asc" | "desc" {
  return value === "asc" || value === "desc"
}
