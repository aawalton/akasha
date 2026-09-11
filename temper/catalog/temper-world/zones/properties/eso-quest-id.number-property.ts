import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const esoQuestId = {
  id: "01a06167-3f9a-7001-ad36-69682c60b23e",
  type: "number-property",
  slug: "eso-quest-id",
  propertySlug: "eso-quest-id",
  definition: "the number the game gives a quest",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
