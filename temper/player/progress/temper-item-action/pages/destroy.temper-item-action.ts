import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const destroy = {
  id: "01a071f0-4c84-7cab-b3ea-39919d0728c9",
  type: "page-type/temper-item-action",
  slug: "destroy",
  title: "Destroy",
  description: "Destroys the item outright.",
} as const satisfies TemperItemAction
