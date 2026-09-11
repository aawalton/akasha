export function textAt(
  values: Readonly<Record<string, unknown>> | null,
  key: string
): string | null {
  const value = values?.[key]
  return typeof value === "string" && value !== "" ? value : null
}
