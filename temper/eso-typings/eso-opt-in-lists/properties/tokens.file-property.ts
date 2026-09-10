import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Tokens = "json"

export const tokens = {
  id: "01a081b0-82e6-75b2-91dd-dc777765ee0b",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "tokens",
  propertySlug: "tokens",
  definition: "the eso api token names a list holds, grouped by the kind of token",
} as const satisfies FileProperty
