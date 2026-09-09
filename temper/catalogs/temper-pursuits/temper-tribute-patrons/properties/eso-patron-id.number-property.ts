import type { NumberProperty } from "@akasha/pages/number-property"

export type EsoPatronId = number

export const esoPatronId = {
  id: "01a06153-0ea9-7003-a29d-d0ea7e0c70aa",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "eso-patron-id",
  propertySlug: "eso-patron-id",
  definition: "the number The Elder Scrolls Online names a tribute patron by",
  max: null,
} as const satisfies NumberProperty
