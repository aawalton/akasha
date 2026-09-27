import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousTrophy = {
  id: "01a0e10d-1b61-7cea-9327-59ab54d191a2",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-trophy",
  title: "Trophy",
  displayOrder: 7,
  match: "Specialized",
  itemTypes: ["temper-item-type/trophy"],
  specializedItemTypes: [
    "temper-specialized-item-type/furnishing-attunable-station",
    "temper-specialized-item-type/trophy-collectible-fragment",
    "temper-specialized-item-type/trophy-key",
    "temper-specialized-item-type/trophy-key-fragment",
    "temper-specialized-item-type/trophy-museum-piece",
    "temper-specialized-item-type/trophy-recipe-fragment",
    "temper-specialized-item-type/trophy-runebox-fragment",
    "temper-specialized-item-type/trophy-scroll",
    "temper-specialized-item-type/trophy-survey-report",
    "temper-specialized-item-type/trophy-toy",
    "temper-specialized-item-type/trophy-treasure-map",
  ],
  parent: "temper-browser-category/miscellaneous",
} as const satisfies TemperBrowserCategory
