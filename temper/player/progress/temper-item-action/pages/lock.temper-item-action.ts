import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const lock = {
  id: "01a071f0-4c85-7404-8a53-dd9a8dc5e1e0",
  type: "page-type/temper-item-action",
  slug: "lock",
  title: "Lock",
  description: "Locks the item against other rules.",
  key: "lock",
  displayOrder: 1,
  createdAt: "2026-09-05T14:19:28.773Z",
  updatedAt: "2026-09-27T10:02:37.000Z",
} as const satisfies TemperItemAction
