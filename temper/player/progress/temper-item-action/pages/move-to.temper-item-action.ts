import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const moveTo = {
  id: "01a071f0-4c85-7772-9c83-1d70b2f35077",
  type: "page-type/temper-item-action",
  slug: "move-to",
  title: "Move To",
  description: "Moves the item to the destination the rule names.",
  key: "move-to",
  displayOrder: 11,
  createdAt: "2026-09-05T14:19:28.773Z",
  updatedAt: "2026-09-27T10:02:37.000Z",
} as const satisfies TemperItemAction
