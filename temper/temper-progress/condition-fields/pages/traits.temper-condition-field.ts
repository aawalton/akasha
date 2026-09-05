import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const traits = {
  id: "01a07209-6b53-7da4-a5c6-20b6d00133c6",
  pageTypeSlug: "temper-condition-field",
  slug: "traits",
  title: "Traits",
  key: "traits",
  description:
    "An item's trait number is turned into a temper trait id, which must appear in the list of trait ids stated.",
} as const satisfies TemperConditionField
