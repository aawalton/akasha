import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const questRelevant = {
  id: "01a06053-b380-723f-b7d9-0551ccc5966a",
  type: "boolean-property",
  slug: "quest-relevant",
  propertySlug: "quest-relevant",
  definition: "whether a quest asks for an item",
  types: "ts",
} as const satisfies BooleanProperty
