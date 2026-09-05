import type { TemperItemAction } from "../temper-item-action.page-type.ts"

export const unlock = {
  id: "01a071f0-4c87-70b7-b714-09c3e0d7e0b9",
  pageTypeSlug: "temper-item-action",
  slug: "unlock",
  title: "Unlock",
  description: "Unlocks the item for other rules.",
} as const satisfies TemperItemAction
