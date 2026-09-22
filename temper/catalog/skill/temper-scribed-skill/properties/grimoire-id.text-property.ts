import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const grimoireId = {
  id: "01a05fca-cb83-73a3-afc2-bf571210f393",
  type: "page-type/text-property",
  slug: "grimoire-id",
  propertySlug: "grimoire-id",
  definition: "a scribed skill's grimoire",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a grimoire.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
