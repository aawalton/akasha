import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const statusDistance = {
  id: "01a06193-6cad-7244-a3f2-6634cf115b2b",
  type: "number-property",
  slug: "status-distance",
  propertySlug: "distance",
  definition: "how far a status moves whoever it lands on",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
