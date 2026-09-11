import type { TemperCompanionTrait } from "akasha/temper/catalog/temper-companions/temper-companion-traits/temper-companion-trait.page-type.types.ts"

export const aggressive = {
  id: "01a05fce-c4ae-76d4-b0f2-55ebd7f2e20e",
  pageTypeSlug: "temper-companion-trait",
  type: "temper-companion-trait",
  slug: "aggressive",
  key: "aggressive",
  title: "Aggressive",
  description: "Increases companion damage done",
  metricId: "companion-damage-done",
  effectType: "fractional-change",
  isReduction: false,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
