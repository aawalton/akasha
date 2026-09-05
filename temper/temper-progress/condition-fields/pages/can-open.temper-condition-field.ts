import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const canOpen = {
  id: "01a07209-6b50-72dd-a9b2-44554e1af2e7",
  pageTypeSlug: "temper-condition-field",
  slug: "can-open",
  title: "Can Open",
  key: "canOpen",
  description:
    "The item must be a container whose cooldown group has expired, and a transmute crystal container fails once the held crystal count reaches the cap.",
} as const satisfies TemperConditionField
