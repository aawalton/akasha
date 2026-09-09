import type { TemperItemAction } from "../temper-item-action.page-type.ts"

export const characterEquip = {
  id: "01a071f0-4c82-73e1-9946-1dc48e9b2d78",
  pageTypeSlug: "temper-item-action",
  slug: "character-equip",
  title: "Equip on character",
  description: "Equips the item on the character the rule names.",
} as const satisfies TemperItemAction
