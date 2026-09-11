import type { TemperCompanionTrait } from "akasha/temper/catalog/temper-companions/temper-companion-traits/temper-companion-trait.page-type.types.ts"

export const bolstered = {
  id: "01a05fce-c4af-7566-b544-fc48ca193628",
  pageTypeSlug: "temper-companion-trait",
  type: "temper-companion-trait",
  slug: "bolstered",
  key: "bolstered",
  title: "Bolstered",
  description: "Reduces companion damage taken",
  metricId: "companion-damage-taken",
  effectType: "fractional-change",
  isReduction: true,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
