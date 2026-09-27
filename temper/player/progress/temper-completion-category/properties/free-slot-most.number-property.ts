import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const freeSlotMost = {
  id: "01a0e1cd-1c72-77f6-83bd-eca723dccec2",
  type: "page-type/number-property",
  slug: "free-slot-most",
  propertySlug: "free-slot-most",
  definition: "the most bar slots that may stand empty while a morph could fill them",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
