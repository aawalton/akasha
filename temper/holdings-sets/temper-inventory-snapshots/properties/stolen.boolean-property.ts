import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const stolen = {
  id: "01a06053-b383-72ed-a4a6-d2b54fc5fb07",
  type: "boolean-property",
  slug: "stolen",
  propertySlug: "stolen",
  definition: "whether the game marks an item as stolen goods",
  types: "ts",
} as const satisfies BooleanProperty
