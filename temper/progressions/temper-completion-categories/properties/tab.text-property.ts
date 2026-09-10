import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Tab = string

export const tab = {
  id: "01a05fcb-d656-76c2-a3f2-90971971c3c3",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "tab",
  propertySlug: "tab",
  definition: "the tab of the completion view a node is shown under",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
