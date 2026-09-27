import type { TemperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.types.ts"

export const furnitureVault = {
  id: "01a0e0d4-8faf-7003-8b37-706b133ad7a0",
  type: "page-type/temper-venue",
  slug: "furniture-vault",
  title: "Furniture Vault",
  key: "furniture-vault",
  displayOrder: 2,
} as const satisfies TemperVenue
