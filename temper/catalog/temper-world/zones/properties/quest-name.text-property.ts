import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const questName = {
  id: "01a06167-3f9b-7005-8239-5f6804becb87",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "quest-name",
  propertySlug: "quest-name",
  definition: "the name a quest is shown under",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
