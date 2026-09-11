import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const repeatableType = {
  id: "01a05fcd-f553-7f0c-93bb-05bec8327fe5",
  type: "number-property",
  slug: "repeatable-type",
  propertySlug: "repeatable-type",
  definition: "how often a quest may be taken again",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
