import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionSpsSelf = {
  id: "01a0df07-1cd5-7319-ae8d-7cfaf23b6156",
  type: "page-type/temper-metric",
  slug: "companion-sps-self",
  title: "Self Shielding Per Second",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
