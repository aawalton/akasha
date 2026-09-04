import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsCasting = boolean

export const isCasting = {
  id: "01a06193-6cb0-7d39-8753-91afc46972af",
  pageTypeSlug: "boolean-property",
  slug: "is-casting",
  propertySlug: "is-casting",
  definition: "whether a test holds only while the target is casting",
} as const satisfies BooleanProperty
