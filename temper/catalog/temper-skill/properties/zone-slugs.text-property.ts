import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ZoneSlug = string

export const zoneSlugs = {
  id: "01a05fca-cb88-7387-b51b-731bff669c39",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "zone-slugs",
  propertySlug: "zone-slugs",
  definition: "the zones a scribing source is worked in",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a zone.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
