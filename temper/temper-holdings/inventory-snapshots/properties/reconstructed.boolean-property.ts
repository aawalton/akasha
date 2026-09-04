import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Reconstructed = boolean

export const reconstructed = {
  id: "01a06053-b380-74b0-b213-68bf36f9efb1",
  pageTypeSlug: "boolean-property",
  slug: "reconstructed",
  propertySlug: "reconstructed",
  definition: "whether an item was rebuilt from an antiquity lead",
} as const satisfies BooleanProperty
