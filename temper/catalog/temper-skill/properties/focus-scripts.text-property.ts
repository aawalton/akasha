import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const focusScripts = {
  id: "01a05fca-cb82-7738-87f5-0530f38d10af",
  type: "text-property",
  slug: "focus-scripts",
  propertySlug: "focus-scripts",
  definition: "the focus scripts a grimoire takes",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a focus script.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
