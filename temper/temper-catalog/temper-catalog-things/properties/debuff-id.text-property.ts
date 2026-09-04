import type { TextProperty } from "@akasha/pages-system/text-property"

export type DebuffId = string

export const debuffId = {
  id: "01a05fd1-d439-75b3-92b0-1243e1ad274a",
  pageTypeSlug: "text-property",
  slug: "debuff-id",
  propertySlug: "debuff-id",
  definition: "the harmful effect a thing puts on whoever it is used against",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a debuff." }],
} as const satisfies TextProperty
