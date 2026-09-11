import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const maxSkyshards = {
  id: "01a05fcd-f559-71f5-b0f8-e16d4faa96a6",
  type: "number-property",
  slug: "max-skyshards",
  propertySlug: "max-skyshards",
  definition: "how many skyshards a source holds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
