import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const unlock = {
  id: "01a071f0-4c87-70b7-b714-09c3e0d7e0b9",
  type: "page-type/temper-item-action",
  slug: "unlock",
  title: "Unlock",
  description: "Unlocks the item for other rules.",
  key: "unlock",
  displayOrder: 2,
  createdAt: "2026-09-05T14:19:28.775Z",
  updatedAt: "2026-09-27T10:02:37.000Z",
} as const satisfies TemperItemAction
