import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type InitialTick = boolean

export const initialTick = {
  id: "01a06193-6caf-730b-a1c7-f65ed2bd71bf",
  pageTypeSlug: "boolean-property",
  slug: "initial-tick",
  propertySlug: "initial-tick",
  definition: "whether an effect ticks the moment it lands",
} as const satisfies BooleanProperty
