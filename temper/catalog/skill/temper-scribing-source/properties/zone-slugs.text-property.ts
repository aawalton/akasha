import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const zoneSlugs = {
  id: "01a05fca-cb88-7387-b51b-731bff669c39",
  type: "page-type/text-property",
  slug: "zone-slugs",
  propertySlug: "zone-slugs",
  definition: "a scribing source's zones",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a zone.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
