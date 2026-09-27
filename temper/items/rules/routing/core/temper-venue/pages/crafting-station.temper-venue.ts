import type { TemperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.types.ts"

export const craftingStation = {
  id: "01a0e0d4-8faf-7005-bb37-fd8a56cbfb96",
  type: "page-type/temper-venue",
  slug: "crafting-station",
  title: "Crafting Station",
  key: "crafting-station",
  displayOrder: 4,
} as const satisfies TemperVenue
