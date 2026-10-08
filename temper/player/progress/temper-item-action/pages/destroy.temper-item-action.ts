import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const destroy = {
  id: "01a071f0-4c84-7cab-b3ea-39919d0728c9",
  type: "page-type/temper-item-action",
  slug: "destroy",
  title: "Destroy",
  description: "Destroys the item outright.",
  key: "destroy",
  displayOrder: 5,
  createdAt: "2026-09-05T14:19:28.772Z",
  updatedAt: "2026-09-27T10:02:37.000Z",
} as const satisfies TemperItemAction
