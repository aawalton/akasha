import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type SetId = number

export const setId = {
  id: "01a05fcd-f554-7c78-a41c-d429e72c298d",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "set-id",
  propertySlug: "set-id",
  definition: "the number the game names an item set by",
  max: null,
} as const satisfies NumberProperty
