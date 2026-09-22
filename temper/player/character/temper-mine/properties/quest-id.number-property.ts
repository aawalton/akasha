import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const questId = {
  id: "01a05fcd-f552-74af-93bb-fae63aec0744",
  type: "page-type/number-property",
  slug: "quest-id",
  propertySlug: "quest-id",
  definition: "the game's number for a quest",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
