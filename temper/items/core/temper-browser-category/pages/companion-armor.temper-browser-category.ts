import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const companionArmor = {
  id: "01a0e10d-1b60-7503-8236-bc308da6f342",
  type: "page-type/temper-browser-category",
  slug: "companion-armor",
  title: "Armor",
  displayOrder: 3,
  match: "Companion",
  itemTypes: ["temper-item-type/armor"],
  equipTypes: [
    "temper-equip-type/head",
    "temper-equip-type/shoulders",
    "temper-equip-type/chest",
    "temper-equip-type/hands",
    "temper-equip-type/legs",
    "temper-equip-type/feet",
    "temper-equip-type/waist",
  ],
  parent: "temper-browser-category/companion",
} as const satisfies TemperBrowserCategory
