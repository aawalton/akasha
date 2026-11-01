export function parseStringArray(raw: unknown): readonly string[] | undefined {
  if (!Array.isArray(raw)) return undefined
  if (!raw.every((entry): entry is string => typeof entry === "string")) return undefined
  return raw
}

export function parseStringArrayOrOne(raw: unknown): readonly string[] | undefined {
  if (typeof raw === "string") return [raw]
  if (typeof raw === "number") return [String(raw)]
  return parseStringArray(raw)
}
