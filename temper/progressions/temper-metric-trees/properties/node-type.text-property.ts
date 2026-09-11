import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const nodeType = {
  id: "01a05fcb-d655-73ba-a6da-f60c6c48e6b4",
  type: "text-property",
  slug: "node-type",
  propertySlug: "node-type",
  definition: "which rank of the metric tree a node sits at",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
