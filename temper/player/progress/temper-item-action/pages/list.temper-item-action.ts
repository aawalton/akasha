import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const list = {
  id: "01a071f0-4c85-705f-8d7c-29387f5b39ab",
  type: "page-type/temper-item-action",
  slug: "list",
  title: "List",
  description: "Lists the item at a guild trader.",
  key: "list",
  displayOrder: 17,
  createdAt: "2026-09-05T14:19:28.773Z",
  updatedAt: "2026-09-27T10:02:37.000Z",
} as const satisfies TemperItemAction
