import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type GoldAmount = number

export const goldAmount = {
  id: "01a06006-154d-7060-ae2d-783ad552437a",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "gold-amount",
  propertySlug: "gold-amount",
  definition: "how much gold an account has",
  max: null,
} as const satisfies NumberProperty
