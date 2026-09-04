import type { TextProperty } from "@akasha/pages-system/text-property"

export type SlottedBehavior = string

export const slottedBehavior = {
  id: "01a05fe0-8426-7594-8834-eb02a3965edd",
  pageTypeSlug: "text-property",
  slug: "slotted-behavior",
  propertySlug: "slotted-behavior",
  definition: "which bar a slotted ability holds its effect on",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
