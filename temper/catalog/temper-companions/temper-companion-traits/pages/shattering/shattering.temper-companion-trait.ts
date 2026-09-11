import type { TemperCompanionTrait } from "akasha/temper/catalog/temper-companions/temper-companion-traits/temper-companion-trait.page-type.types.ts"

export const shattering = {
  id: "01a05fce-c4b0-75e4-8085-89376ec1cdf3",
  pageTypeSlug: "temper-companion-trait",
  type: "temper-companion-trait",
  slug: "shattering",
  key: "shattering",
  title: "Shattering",
  description: "Increases companion Penetration",
  metricId: "companion-penetration",
  effectType: "integer",
  isReduction: false,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
