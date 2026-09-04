import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoNum = number

export const esoNum = {
  id: "01a05fd1-d43a-7c6d-944f-47ddf5e57228",
  pageTypeSlug: "number-property",
  slug: "eso-num",
  propertySlug: "eso-num",
  definition: "the number The Elder Scrolls Online names a gear value by",
  max: null,
} as const satisfies NumberProperty
