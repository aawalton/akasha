import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const armorHeavy = {
  id: "01a0e10d-1b60-7e73-9f2a-87db073aa308",
  type: "page-type/temper-browser-category",
  slug: "armor-heavy",
  title: "Heavy",
  displayOrder: 2,
  match: "Armor",
  armorWeights: ["temper-armor-weight/heavy"],
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
