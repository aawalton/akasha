import type { TemperCompanionTrait } from "../../temper-companion-trait.page-type.ts"

export const aggressive = {
  id: "01a05fce-c4ae-76d4-b0f2-55ebd7f2e20e",
  pageTypeSlug: "temper-companion-trait",
  slug: "aggressive",
  key: "aggressive",
  title: "Aggressive",
  description: "Increases companion damage done",
  metricId: "companion-damage-done",
  type: "fractional-change",
  isReduction: false,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
