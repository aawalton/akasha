import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const canResearch = {
  id: "01a07209-6b50-7646-9a92-24244b55870e",
  pageTypeSlug: "temper-condition-field",
  slug: "can-research",
  title: "Can Research",
  key: "canResearch",
  description:
    "At least one character must have the item's trait unresearched for the item's crafting type where the value is `can-research`.",
} as const satisfies TemperConditionField
