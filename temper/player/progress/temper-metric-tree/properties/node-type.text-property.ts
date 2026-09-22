import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const nodeType = {
  id: "01a05fcb-d655-73ba-a6da-f60c6c48e6b4",
  type: "page-type/text-property",
  slug: "node-type",
  propertySlug: "node-type",
  definition: "a node's rank in the metric tree",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
