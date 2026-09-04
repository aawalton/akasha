import "@akasha/temper-eso-types/eso-globals"

export function buildEnumValueLabels(
  values: Record<string, number>,
  stringPrefix: string
): Record<number, string> {
  const labels: Record<number, string> = {}
  for (const value of Object.values(values)) {
    const label = GetString(stringPrefix, value)
    if (label !== "") {
      labels[value] = label
    }
  }
  return labels
}
