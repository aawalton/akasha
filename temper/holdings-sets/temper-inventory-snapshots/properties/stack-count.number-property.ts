import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const stackCount = {
  id: "01a06053-b382-7fd6-a97a-e9ff94c0ca37",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "stack-count",
  propertySlug: "stack-count",
  definition: "how many of an item a stack has",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
