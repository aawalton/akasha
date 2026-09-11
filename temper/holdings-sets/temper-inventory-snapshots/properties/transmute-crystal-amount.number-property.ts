import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const transmuteCrystalAmount = {
  id: "01a0675a-f185-7a1b-bbef-b8873cf8b97e",
  type: "number-property",
  slug: "transmute-crystal-amount",
  propertySlug: "transmute-crystal-amount",
  definition: "how many transmute crystals an account holds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
