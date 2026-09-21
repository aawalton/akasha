export function isNamedShape<T>(value: unknown): value is T {
  return typeof value === "object" && value !== null && "name" in value
}
