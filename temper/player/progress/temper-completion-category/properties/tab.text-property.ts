import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const tab = {
  id: "01a05fcb-d656-76c2-a3f2-90971971c3c3",
  type: "page-type/text-property",
  slug: "tab",
  propertySlug: "tab",
  definition: "a node's tab in the completion view",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
