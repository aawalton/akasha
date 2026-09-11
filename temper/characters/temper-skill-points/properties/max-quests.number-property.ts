import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const maxQuests = {
  id: "01a05fcd-f558-7da6-8586-f6450e0e3428",
  type: "number-property",
  slug: "max-quests",
  propertySlug: "max-quests",
  definition: "how many quests a source gives a skill point for",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
