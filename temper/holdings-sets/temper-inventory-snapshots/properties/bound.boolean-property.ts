import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type Bound = boolean

export const bound = {
  id: "01a06053-b37c-78e9-93a9-c755ee269037",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "bound",
  propertySlug: "bound",
  definition: "whether an item is tied to the account with the item",
} as const satisfies BooleanProperty
