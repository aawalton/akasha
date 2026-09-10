import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type CompletionTypeLabel = string

export const completionTypeLabel = {
  id: "01a06167-3f9b-7008-a918-df5312c7db75",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "completion-type-label",
  propertySlug: "completion-type-label",
  definition: "the name a kind of completion activity is shown under",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
