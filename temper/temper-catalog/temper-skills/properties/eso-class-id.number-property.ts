import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoClassId = number

export const esoClassId = {
  id: "01a05fca-cb81-7a6f-9371-f359d8930454",
  pageTypeSlug: "number-property",
  slug: "eso-class-id",
  propertySlug: "eso-class-id",
  definition: "the number The Elder Scrolls Online names a class by",
  max: null,
} as const satisfies NumberProperty
