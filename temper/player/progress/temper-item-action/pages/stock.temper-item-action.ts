import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const stock = {
  id: "01a071f0-4c86-735a-92fe-07fa9541b270",
  type: "page-type/temper-item-action",
  slug: "stock",
  title: "Stock",
  description: "Keeps a target quantity of the item at the destination the rule names.",
  key: "stock",
  displayOrder: 12,
  createdAt: "2026-09-05T14:19:28.774Z",
  updatedAt: "2026-09-27T10:02:37.000Z",
} as const satisfies TemperItemAction
