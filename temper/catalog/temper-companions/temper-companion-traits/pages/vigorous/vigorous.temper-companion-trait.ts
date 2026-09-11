import type { TemperCompanionTrait } from "akasha/temper/catalog/temper-companions/temper-companion-traits/temper-companion-trait.page-type.types.ts"

export const vigorous = {
  id: "01a05fce-c4b1-7ee6-a23d-dede085d0557",
  type: "temper-companion-trait",
  slug: "vigorous",
  key: "vigorous",
  title: "Vigorous",
  description: "Increases companion Maximum Health",
  metricId: "companion-health-maximum",
  effectType: "fractional-change",
  isReduction: false,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
