import type { TemperItemAction } from "../temper-item-action.page-type.ts"

export const companionEquip = {
  id: "01a071f0-4c83-7121-afdc-587d911a55ed",
  pageTypeSlug: "temper-item-action",
  slug: "companion-equip",
  title: "Equip on companion",
  description: "Equips the item on the companion the rule names.",
} as const satisfies TemperItemAction
