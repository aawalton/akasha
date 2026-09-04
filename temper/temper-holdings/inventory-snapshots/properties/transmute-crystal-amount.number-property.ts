import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TransmuteCrystalAmount = number

export const transmuteCrystalAmount = {
  id: "01a0675a-f185-7a1b-bbef-b8873cf8b97e",
  pageTypeSlug: "number-property",
  slug: "transmute-crystal-amount",
  propertySlug: "transmute-crystal-amount",
  definition: "how many transmute crystals an account holds",
  max: null,
} as const satisfies NumberProperty
