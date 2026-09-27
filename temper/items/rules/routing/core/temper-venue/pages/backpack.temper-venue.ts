import type { TemperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.types.ts"

export const backpack = {
  id: "01a0e0d4-8faf-700b-b34a-adb19e4a07dc",
  type: "page-type/temper-venue",
  slug: "backpack",
  title: "Backpack",
  key: "backpack",
  displayOrder: 10,
} as const satisfies TemperVenue
