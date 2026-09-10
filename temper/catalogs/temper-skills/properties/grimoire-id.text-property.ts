import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type GrimoireId = string

export const grimoireId = {
  id: "01a05fca-cb83-73a3-afc2-bf571210f393",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "grimoire-id",
  propertySlug: "grimoire-id",
  definition: "the grimoire a scribed skill is scribed from",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a grimoire.",
    },
  ],
} as const satisfies TextProperty
