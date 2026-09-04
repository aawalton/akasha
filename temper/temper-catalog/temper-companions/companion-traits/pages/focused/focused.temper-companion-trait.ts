import type { TemperCompanionTrait } from "../../temper-companion-trait.page-type.ts"

export const focused = {
  id: "01a05fce-c4af-7d13-ad7c-a7e9b1934c38",
  pageTypeSlug: "temper-companion-trait",
  slug: "focused",
  key: "focused",
  title: "Focused",
  description: "Increases companion Critical Strike rating",
  metricId: "companion-critical-chance",
  type: "integer",
  isReduction: false,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
