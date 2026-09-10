import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type Dormant = boolean

export const dormant = {
  id: "01a05fc4-7a90-772c-bd1c-d38e59cdf948",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "dormant",
  propertySlug: "dormant",
  definition: "whether an area of the capture is left alone for now",
} as const satisfies BooleanProperty
