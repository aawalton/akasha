import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const maxQuests = {
  id: "01a05fcd-f558-7da6-8586-f6450e0e3428",
  type: "page-type/number-property",
  slug: "max-quests",
  propertySlug: "max-quests",
  definition: "how many quests earn a skill point from a source",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
