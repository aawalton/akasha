import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const maxOccurrences = {
  id: "01a06193-6cab-70b7-ab3c-01c5061dbc9e",
  type: "number-property",
  slug: "max-occurrences",
  propertySlug: "max-occurrences",
  definition: "how many times an effect fires before it stops",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
