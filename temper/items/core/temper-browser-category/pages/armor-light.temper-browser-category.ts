import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const armorLight = {
  id: "01a0e10d-1b60-7a2b-8873-048745e18e5c",
  type: "page-type/temper-browser-category",
  slug: "armor-light",
  title: "Light",
  displayOrder: 4,
  match: "Armor",
  armorWeights: ["temper-armor-weight/light"],
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
