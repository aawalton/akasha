import type { NumberProperty } from "@akasha/pages-system/number-property"

export type StopIndex = number

export const stopIndex = {
  id: "01a06180-7a17-7000-8c95-74fd69e6c770",
  pageTypeSlug: "number-property",
  slug: "stop-index",
  propertySlug: "stop-index",
  definition: "where a stop falls in the list Cadwell names for one zone",
  max: null,
} as const satisfies NumberProperty
