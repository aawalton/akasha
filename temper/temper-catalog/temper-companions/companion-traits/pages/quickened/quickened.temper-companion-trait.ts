import type { TemperCompanionTrait } from "../../temper-companion-trait.page-type.ts"

export const quickened = {
  id: "01a05fce-c4b0-72a1-9c7b-e63389b0f298",
  pageTypeSlug: "temper-companion-trait",
  slug: "quickened",
  key: "quickened",
  title: "Quickened",
  description: "Reduces companion ability cooldowns",
  metricId: "companion-ability-cooldown",
  type: "fractional-change",
  isReduction: true,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
