import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Stolen = boolean

export const stolen = {
  id: "01a06053-b383-72ed-a4a6-d2b54fc5fb07",
  pageTypeSlug: "boolean-property",
  slug: "stolen",
  propertySlug: "stolen",
  definition: "whether the game marks an item as stolen goods",
} as const satisfies BooleanProperty
