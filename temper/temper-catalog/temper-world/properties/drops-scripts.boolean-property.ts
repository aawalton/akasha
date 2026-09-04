import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type DropsScripts = boolean

export const dropsScripts = {
  id: "01a05fc4-7a91-733c-b405-4c001541261a",
  pageTypeSlug: "boolean-property",
  slug: "drops-scripts",
  propertySlug: "drops-scripts",
  definition: "whether a zone drops scribing scripts",
} as const satisfies BooleanProperty
