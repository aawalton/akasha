import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const levelOp = {
  id: "01a07209-6b51-7d3a-8a59-0486cf4064e2",
  pageTypeSlug: "temper-condition-field",
  slug: "level-op",
  title: "Level Comparison",
  key: "levelOp",
  description:
    "The operator named here replaces the default `<=` when an item's required level is compared against `maxLevel`.",
} as const satisfies TemperConditionField
