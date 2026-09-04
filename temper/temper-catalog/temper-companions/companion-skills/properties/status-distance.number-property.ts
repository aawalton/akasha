import type { NumberProperty } from "@akasha/pages-system/number-property"

export type StatusDistance = number

export const statusDistance = {
  id: "01a06193-6cad-7244-a3f2-6634cf115b2b",
  pageTypeSlug: "number-property",
  slug: "status-distance",
  propertySlug: "distance",
  definition: "how far a status moves whoever it lands on",
  max: null,
} as const satisfies NumberProperty
