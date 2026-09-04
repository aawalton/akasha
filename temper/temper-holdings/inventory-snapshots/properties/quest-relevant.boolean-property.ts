import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type QuestRelevant = boolean

export const questRelevant = {
  id: "01a06053-b380-723f-b7d9-0551ccc5966a",
  pageTypeSlug: "boolean-property",
  slug: "quest-relevant",
  propertySlug: "quest-relevant",
  definition: "whether a quest asks for an item",
} as const satisfies BooleanProperty
