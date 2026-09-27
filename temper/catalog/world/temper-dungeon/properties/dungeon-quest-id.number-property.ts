import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const dungeonQuestId = {
  id: "01a0e0fe-fb55-721a-97a5-d0233881a654",
  type: "page-type/number-property",
  slug: "dungeon-quest-id",
  propertySlug: "quest-id",
  definition: "the game's number for the quest a dungeon hands a skill point for",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
