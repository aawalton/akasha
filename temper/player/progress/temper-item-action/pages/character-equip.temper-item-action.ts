import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const characterEquip = {
  id: "01a071f0-4c82-73e1-9946-1dc48e9b2d78",
  type: "page-type/temper-item-action",
  slug: "character-equip",
  title: "Equip",
  description: "Equips the item on the character the rule names.",
  key: "character-equip",
  displayOrder: 8,
  createdAt: "2026-09-05T14:19:28.770Z",
  updatedAt: "2026-09-27T10:02:37.000Z",
} as const satisfies TemperItemAction
