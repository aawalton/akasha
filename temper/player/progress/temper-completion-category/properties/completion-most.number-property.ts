import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const completionMost = {
  id: "01a0e157-b483-7926-a3c2-f853ce7a845b",
  type: "page-type/number-property",
  slug: "completion-most",
  propertySlug: "completion-most",
  definition: "the most the game lets a player reach under a completion category, where it caps it",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
