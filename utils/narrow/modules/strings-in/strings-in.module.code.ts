export function stringsIn(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return []
  return value.filter((one): one is string => typeof one === "string")
}
