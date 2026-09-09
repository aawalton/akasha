import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "@akasha/pages/text-property"

export type FocusScript = string
export type FocusScripts = List<FocusScript>

export const focusScripts = {
  id: "01a05fca-cb82-7738-87f5-0530f38d10af",
  pageTypeSlug: "text-property",
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
} as const satisfies TextProperty
