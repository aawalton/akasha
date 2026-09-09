import type { BooleanProperty } from "@akasha/pages/boolean-property"

export type RuleLocked = boolean

export const ruleLocked = {
  id: "01a07283-f293-7fc7-9ed8-4c01ff4038fd",
  pageTypeSlug: "boolean-property",
  slug: "rule-locked",
  propertySlug: "locked",
  definition: "whether a rule is held back from being edited or deleted",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked rule is carried through a reset to defaults untouched.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a rule is locked is stated rather than worked out from where that rule came.",
    },
  ],
} as const satisfies BooleanProperty
