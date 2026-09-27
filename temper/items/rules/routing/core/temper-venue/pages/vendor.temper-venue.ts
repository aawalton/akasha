import type { TemperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.types.ts"

export const vendor = {
  id: "01a0e0d4-8faf-7006-a047-18fa72b7ec88",
  type: "page-type/temper-venue",
  slug: "vendor",
  title: "Merchant",
  key: "vendor",
  displayOrder: 5,
} as const satisfies TemperVenue
