import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const research = {
  id: "01a071f0-4c86-7187-ac64-c45f8423f9c7",
  type: "page-type/temper-item-action",
  slug: "research",
  title: "Research",
  description: "Researches the trait the item carries.",
  key: "research",
  displayOrder: 6,
  createdAt: "2026-09-05T14:19:28.774Z",
  updatedAt: "2026-09-27T10:02:37.000Z",
} as const satisfies TemperItemAction
