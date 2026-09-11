import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const activityName = {
  id: "01a06167-3f9b-7009-8c15-e859ba75172d",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "activity-name",
  propertySlug: "activity-name",
  definition: "the name a completion activity is shown under",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
