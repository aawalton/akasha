export type QualityValues = {
  readonly normal: number
  readonly fine: number
  readonly superior: number
  readonly epic: number
  readonly legendary: number
}

export function renderQualityValues(qv: QualityValues): string {
  return `{ normal: ${qv.normal}, fine: ${qv.fine}, superior: ${qv.superior}, epic: ${qv.epic}, legendary: ${qv.legendary} }`
}

export function renderQualityComponents(
  components: Readonly<Record<string, QualityValues>>
): string {
  const entries = Object.entries(components)
  if (entries.length === 0) return "{}"
  const sortedEntries = [...entries].sort(([a], [b]) => a.localeCompare(b))
  const inner = sortedEntries
    .map(([k, v]) => `${JSON.stringify(k)}: ${renderQualityValues(v)}`)
    .join(", ")
  return `{ ${inner} }`
}
