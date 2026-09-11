import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const debuffId = {
  id: "01a05fd1-d439-75b3-92b0-1243e1ad274a",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "debuff-id",
  propertySlug: "debuff-id",
  definition: "the harmful effect a thing puts on whoever it is used against",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a debuff." }],
  types: "ts",
} as const satisfies TextProperty
