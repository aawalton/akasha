import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const focusScriptId = {
  id: "01a05fca-cb82-7061-bc09-5c8739182b83",
  type: "page-type/text-property",
  slug: "focus-script-id",
  propertySlug: "focus-script-id",
  definition: "a scribed skill's focus script",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a focus script.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
