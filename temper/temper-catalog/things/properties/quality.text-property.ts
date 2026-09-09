import type { TextProperty } from "@akasha/pages/text-property"

export type Quality = string

export const quality = {
  id: "01a05fb0-3ced-77db-9e30-4e6234c93115",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "quality",
  propertySlug: "quality",
  definition: "the grade a thing is made at",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a quality." }],
} as const satisfies TextProperty
