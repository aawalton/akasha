import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const quality = {
  id: "01a05fb0-3ced-77db-9e30-4e6234c93115",
  type: "page-type/text-property",
  slug: "quality",
  propertySlug: "quality",
  definition: "a thing's grade",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    { decisionKind: "decision-kind/gap", statement: "This property is a relation to a quality." },
  ],
  types: "ts",
} as const satisfies TextProperty
