import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const qualityOp = {
  id: "01a07209-6b52-73e1-8146-199bac987c98",
  pageTypeSlug: "temper-condition-field",
  slug: "quality-op",
  title: "Quality Comparison",
  key: "qualityOp",
  description:
    "The operator named here replaces the default `<=` when an item's quality is compared against `maxQuality`.",
} as const satisfies TemperConditionField
