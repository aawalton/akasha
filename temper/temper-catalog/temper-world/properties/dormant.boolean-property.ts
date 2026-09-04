import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Dormant = boolean

export const dormant = {
  id: "01a05fc4-7a90-772c-bd1c-d38e59cdf948",
  pageTypeSlug: "boolean-property",
  slug: "dormant",
  propertySlug: "dormant",
  definition: "whether an area of the capture is left alone for now",
} as const satisfies BooleanProperty
