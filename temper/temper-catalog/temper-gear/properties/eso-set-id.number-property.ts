import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoSetId = number

export const esoSetId = {
  id: "01a05fd1-d43a-7510-99a4-94fed1b76c3b",
  pageTypeSlug: "number-property",
  slug: "eso-set-id",
  propertySlug: "eso-set-id",
  definition: "the number The Elder Scrolls Online names a set by",
  max: null,
} as const satisfies NumberProperty
