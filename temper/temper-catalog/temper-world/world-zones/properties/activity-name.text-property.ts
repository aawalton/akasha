import type { TextProperty } from "@akasha/pages-system/text-property"

export type ActivityName = string

export const activityName = {
  id: "01a06167-3f9b-7009-8c15-e859ba75172d",
  pageTypeSlug: "text-property",
  slug: "activity-name",
  propertySlug: "activity-name",
  definition: "the name a completion activity is shown under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
