import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const excludedGuildBankValue = {
  id: "01a06006-154d-7e2e-a167-9efa2ff3d358",
  type: "number-property",
  slug: "excluded-guild-bank-value",
  propertySlug: "excluded-guild-bank-value",
  definition: "what the guild bank goods left out of a reading are worth",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
