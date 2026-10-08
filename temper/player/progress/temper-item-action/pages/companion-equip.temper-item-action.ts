import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const companionEquip = {
  id: "01a071f0-4c83-7121-afdc-587d911a55ed",
  type: "page-type/temper-item-action",
  slug: "companion-equip",
  title: "Companion Equip",
  description: "Equips the item on the companion the rule names.",
  key: "companion-equip",
  displayOrder: 9,
  createdAt: "2026-09-05T14:19:28.771Z",
  updatedAt: "2026-09-27T10:02:37.000Z",
} as const satisfies TemperItemAction
