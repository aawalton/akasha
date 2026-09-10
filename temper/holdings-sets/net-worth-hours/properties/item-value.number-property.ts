import type { NumberProperty } from "@akasha/pages/number-property"

export type ItemValue = number

export const itemValue = {
  id: "01a06006-154e-75d4-ad1a-d5012faa5a73",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "item-value",
  propertySlug: "item-value",
  definition: "what the items an account has are worth in gold",
  max: null,
} as const satisfies NumberProperty
