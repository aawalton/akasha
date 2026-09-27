import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesDrink = {
  id: "01a0e10d-1b60-7853-a851-53527e49df44",
  type: "page-type/temper-browser-category",
  slug: "consumables-drink",
  title: "Drink",
  displayOrder: 3,
  match: "Specialized",
  itemTypes: ["temper-item-type/drink"],
  specializedItemTypes: [
    "temper-specialized-item-type/drink-alcoholic",
    "temper-specialized-item-type/drink-cordial-tea",
    "temper-specialized-item-type/drink-distillate",
    "temper-specialized-item-type/drink-liqueur",
    "temper-specialized-item-type/drink-tea",
    "temper-specialized-item-type/drink-tincture",
    "temper-specialized-item-type/drink-tonic",
    "temper-specialized-item-type/drink-unique",
  ],
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
