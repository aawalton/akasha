import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const canUnlock = {
  id: "01a07209-6b50-75e6-813e-65439000ea7d",
  pageTypeSlug: "temper-condition-field",
  slug: "can-unlock",
  title: "Can Unlock",
  key: "canUnlock",
  description:
    "The item must be unknown to at least one character where the value is `can-unlock`, which is the negation of every character already knowing the item.",
} as const satisfies TemperConditionField
