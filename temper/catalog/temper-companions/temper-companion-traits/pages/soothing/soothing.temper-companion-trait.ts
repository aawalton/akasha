import type { TemperCompanionTrait } from "akasha/temper/catalog/temper-companions/temper-companion-traits/temper-companion-trait.page-type.types.ts"

export const soothing = {
  id: "01a05fce-c4b1-7c18-9828-60ac8b4aafa2",
  type: "temper-companion-trait",
  slug: "soothing",
  key: "soothing",
  title: "Soothing",
  description: "Increases companion healing done",
  metricId: "companion-healing-done",
  effectType: "fractional-change",
  isReduction: false,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
