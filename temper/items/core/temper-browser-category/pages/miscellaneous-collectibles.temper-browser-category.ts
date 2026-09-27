import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousCollectibles = {
  id: "01a0e10d-1b61-7765-a79e-087d7fa556ae",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-collectibles",
  title: "Collectibles",
  displayOrder: 12,
  match: "MiscSubfilter",
  specializedItemTypes: [
    "temper-specialized-item-type/collectible-monster-trophy",
    "temper-specialized-item-type/collectible-rare-fish",
    "temper-specialized-item-type/collectible-style-page",
    "temper-specialized-item-type/fish",
    "temper-specialized-item-type/treasure",
  ],
  parent: "temper-browser-category/miscellaneous",
} as const satisfies TemperBrowserCategory
