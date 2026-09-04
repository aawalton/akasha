import type { NumberProperty } from "@akasha/pages-system/number-property"

export type MaxRank = number

export const maxRank = {
  id: "01a05fca-cb85-7145-9db5-02dbc3c326e6",
  pageTypeSlug: "number-property",
  slug: "max-rank",
  propertySlug: "max-rank",
  definition: "the highest rank a skill line reaches",
  max: null,
} as const satisfies NumberProperty
