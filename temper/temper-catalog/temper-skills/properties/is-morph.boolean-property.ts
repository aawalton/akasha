import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsMorph = boolean

export const isMorph = {
  id: "01a05fca-cb83-7c29-9709-61ea9622a90d",
  pageTypeSlug: "boolean-property",
  slug: "is-morph",
  propertySlug: "is-morph",
  definition: "whether a skill is a morph of another skill",
} as const satisfies BooleanProperty
