import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const deconstruct = {
  id: "01a071f0-4c83-71e2-94a3-f462adf5820c",
  type: "page-type/temper-item-action",
  slug: "deconstruct",
  title: "Deconstruct",
  description: "Breaks the item down for the materials the item yields.",
  key: "deconstruct",
  displayOrder: 3,
} as const satisfies TemperItemAction
