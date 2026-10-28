import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const fill = {
  id: "01a183c7-123e-7f0e-978a-eda72ac997d5",
  type: "page-type/temper-item-action",
  slug: "fill",
  title: "Fill",
  description:
    "Fills the empty soul gems a character carries, by Soul Trap on a creature that character kills, anywhere in the field.",
  key: "fill",
  displayOrder: 20,
  createdAt: "2026-10-28T18:30:24.062Z",
  updatedAt: "2026-10-28T18:30:24.062Z",
} as const satisfies TemperItemAction
