import type { NumberProperty } from "@akasha/pages/number-property"

export type CycleLength = number

export const cycleLength = {
  id: "01a05fc4-7a90-760c-b5a4-05db1aebe326",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "cycle-length",
  propertySlug: "cycle-length",
  definition: "how many days a rotation runs before it comes round again",
  max: null,
} as const satisfies NumberProperty
