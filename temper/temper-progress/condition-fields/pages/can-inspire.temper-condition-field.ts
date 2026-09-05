import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const canInspire = {
  id: "01a07209-6b50-7b62-878d-1019c1380dd7",
  pageTypeSlug: "temper-condition-field",
  slug: "can-inspire",
  title: "Can Inspire",
  key: "canInspire",
  description:
    "At least one character must sit below the crafting rank cap for the crafting type the item implies where the value is `can-inspire`, and no character may where the value is `cannot-inspire`.",
} as const satisfies TemperConditionField
