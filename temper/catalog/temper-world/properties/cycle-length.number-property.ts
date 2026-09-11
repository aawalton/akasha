import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const cycleLength = {
  id: "01a05fc4-7a90-760c-b5a4-05db1aebe326",
  type: "number-property",
  slug: "cycle-length",
  propertySlug: "cycle-length",
  definition: "how many days a rotation runs before it comes round again",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
