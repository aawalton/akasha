import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const fenceLaunder = {
  id: "01a071f0-4c84-7b4d-8467-1404cf41193c",
  type: "page-type/temper-item-action",
  slug: "fence-launder",
  title: "Launder",
  description: "Launders a stolen item at a fence.",
  key: "fence-launder",
  displayOrder: 7,
  createdAt: "2026-09-05T14:19:28.772Z",
  updatedAt: "2026-09-27T10:02:37.000Z",
} as const satisfies TemperItemAction
