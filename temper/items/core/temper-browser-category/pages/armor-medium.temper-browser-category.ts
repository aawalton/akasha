import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const armorMedium = {
  id: "01a0e10d-1b60-7dcb-9187-f2af38b7fb4f",
  type: "page-type/temper-browser-category",
  slug: "armor-medium",
  title: "Medium",
  displayOrder: 3,
  match: "Armor",
  armorWeights: ["temper-armor-weight/medium"],
  equipTypes: [
    "temper-equip-type/head",
    "temper-equip-type/shoulders",
    "temper-equip-type/chest",
    "temper-equip-type/hands",
    "temper-equip-type/legs",
    "temper-equip-type/feet",
    "temper-equip-type/waist",
  ],
  parent: "temper-browser-category/armor",
} as const satisfies TemperBrowserCategory
