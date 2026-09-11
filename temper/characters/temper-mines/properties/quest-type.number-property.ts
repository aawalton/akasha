import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const questType = {
  id: "01a05fcd-f553-70ca-826b-21fa83f0dffd",
  type: "number-property",
  slug: "quest-type",
  propertySlug: "quest-type",
  definition: "the sort of quest a quest is",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
