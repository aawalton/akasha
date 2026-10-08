import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const questGiver = {
  id: "01a05fc4-7a93-7960-9695-186bd5fc0248",
  type: "page-type/relation-property",
  slug: "quest-giver",
  propertySlug: "quest-giver",
  definition: "the character handing out a dungeon's pledge",
  targetPageType: "page-type/temper-quest-giver",
  types: "ts",
  createdAt: "2026-09-02T01:38:27.091Z",
  updatedAt: "2026-09-21T15:28:00.000Z",
} as const satisfies RelationProperty
