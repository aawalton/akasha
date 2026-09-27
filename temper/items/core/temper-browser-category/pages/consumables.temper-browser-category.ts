import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumables = {
  id: "01a0e10d-1b61-7daf-8e50-3c943afa4402",
  type: "page-type/temper-browser-category",
  slug: "consumables",
  title: "Consumables",
  displayOrder: 5,
  match: "Consumable",
  itemTypes: [
    "temper-item-type/container",
    "temper-item-type/container-currency",
    "temper-item-type/container-stackable",
    "temper-item-type/food",
    "temper-item-type/drink",
    "temper-item-type/potion",
    "temper-item-type/poison",
    "temper-item-type/recipe",
    "temper-item-type/racial-style-motif",
    "temper-item-type/master-writ",
    "temper-item-type/ava-repair",
    "temper-item-type/group-repair",
    "temper-item-type/tool",
    "temper-item-type/crown-repair",
    "temper-item-type/crown-item",
    "temper-item-type/dye-stamp",
    "temper-item-type/recall-stone",
  ],
} as const satisfies TemperBrowserCategory
