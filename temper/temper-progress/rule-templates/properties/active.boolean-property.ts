import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Active = boolean

export const active = {
  id: "01a05fd0-3aa3-7e9f-808e-4c11431a2f47",
  pageTypeSlug: "boolean-property",
  slug: "active",
  propertySlug: "active",
  definition: "whether a rule is switched on",
} as const satisfies BooleanProperty
