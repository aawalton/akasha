import type { TemperCompanionTrait } from "akasha/temper/catalog/temper-companions/temper-companion-traits/temper-companion-trait.page-type.types.ts"

export const quickened = {
  id: "01a05fce-c4b0-72a1-9c7b-e63389b0f298",
  pageTypeSlug: "temper-companion-trait",
  type: "temper-companion-trait",
  slug: "quickened",
  key: "quickened",
  title: "Quickened",
  description: "Reduces companion ability cooldowns",
  metricId: "companion-ability-cooldown",
  effectType: "fractional-change",
  isReduction: true,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
