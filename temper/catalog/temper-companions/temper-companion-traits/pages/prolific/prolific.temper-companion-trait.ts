import type { TemperCompanionTrait } from "akasha/temper/catalog/temper-companions/temper-companion-traits/temper-companion-trait.page-type.types.ts"

export const prolific = {
  id: "01a05fce-c4b0-7db1-b613-848e703bbfc8",
  pageTypeSlug: "temper-companion-trait",
  type: "temper-companion-trait",
  slug: "prolific",
  key: "prolific",
  title: "Prolific",
  description: "Increases companion Ultimate generation",
  metricId: "companion-ultimate-generation",
  effectType: "fractional-change",
  isReduction: false,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
