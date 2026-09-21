import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const companionEquip = {
  id: "01a071f0-4c83-7121-afdc-587d911a55ed",
  type: "page-type/temper-item-action",
  slug: "companion-equip",
  title: "Equip on companion",
  description: "Equips the item on the companion the rule names.",
} as const satisfies TemperItemAction
