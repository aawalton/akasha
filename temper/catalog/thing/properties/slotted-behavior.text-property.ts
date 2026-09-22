import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const slottedBehavior = {
  id: "01a05fe0-8426-7594-8834-eb02a3965edd",
  type: "page-type/text-property",
  slug: "slotted-behavior",
  propertySlug: "slotted-behavior",
  definition: "which bar a slotted ability affects",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
