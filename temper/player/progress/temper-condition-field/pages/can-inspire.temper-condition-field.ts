import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const canInspire = {
  id: "01a07209-6b50-7b62-878d-1019c1380dd7",
  type: "page-type/temper-condition-field",
  slug: "can-inspire",
  title: "Can Inspire",
  key: "canInspire",
  description:
    "At least one character must sit below the crafting rank cap for the crafting type the item implies where the value is `can-inspire`, and no character may where the value is `cannot-inspire`.",
  createdAt: "2026-09-05T14:46:55.056Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
