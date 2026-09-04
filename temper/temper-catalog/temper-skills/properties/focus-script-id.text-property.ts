import type { TextProperty } from "@akasha/pages-system/text-property"

export type FocusScriptId = string

export const focusScriptId = {
  id: "01a05fca-cb82-7061-bc09-5c8739182b83",
  pageTypeSlug: "text-property",
  slug: "focus-script-id",
  propertySlug: "focus-script-id",
  definition: "the focus script a scribed skill is written with",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a focus script.",
    },
  ],
} as const satisfies TextProperty
