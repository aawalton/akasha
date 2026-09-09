import type { TextProperty } from "@akasha/pages/text-property"

export type QuestName = string

export const questName = {
  id: "01a06167-3f9b-7005-8239-5f6804becb87",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "quest-name",
  propertySlug: "quest-name",
  definition: "the name a quest is shown under",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
