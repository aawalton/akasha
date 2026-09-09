export function parseStringArray(raw: unknown): readonly string[] | undefined {
  if (!Array.isArray(raw)) return undefined
  if (!raw.every((entry): entry is string => typeof entry === "string")) return undefined
  return raw
}
