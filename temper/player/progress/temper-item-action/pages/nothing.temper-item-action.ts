import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const nothing = {
  id: "01a071f0-4c85-7eb9-9625-4b57c018d0b1",
  type: "page-type/temper-item-action",
  slug: "nothing",
  title: "Do Nothing",
  description: "Leaves the item in place.",
  key: "nothing",
  displayOrder: 0,
  createdAt: "2026-09-05T14:19:28.773Z",
  updatedAt: "2026-09-27T10:02:37.000Z",
} as const satisfies TemperItemAction
