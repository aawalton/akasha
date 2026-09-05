import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const maxQuality = {
  id: "01a07209-6b52-7d21-881a-8dfea4e1e1ac",
  pageTypeSlug: "temper-condition-field",
  slug: "max-quality",
  title: "Max Quality",
  key: "maxQuality",
  description:
    "An item's quality number is compared against the number stated, under `<=` unless `qualityOp` names another operator.",
} as const satisfies TemperConditionField
