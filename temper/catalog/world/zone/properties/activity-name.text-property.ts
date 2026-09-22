import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const activityName = {
  id: "01a06167-3f9b-7009-8c15-e859ba75172d",
  type: "page-type/text-property",
  slug: "activity-name",
  propertySlug: "activity-name",
  definition: "a completion activity's name",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
