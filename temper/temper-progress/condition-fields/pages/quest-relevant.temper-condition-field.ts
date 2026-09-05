import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const questRelevant = {
  id: "01a07209-6b52-7d14-ae71-270876892ccc",
  pageTypeSlug: "temper-condition-field",
  slug: "quest-relevant",
  title: "Quest Relevant",
  key: "questRelevant",
  description:
    "An item's quest-relevant flag must be true where the value is `quest-relevant` and false where the value is `not-quest-relevant`.",
} as const satisfies TemperConditionField
