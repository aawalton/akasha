import type { RruleProperty } from "akasha/page/rrule-property/rrule-property.page-type.types.ts"

export const rruleRule = {
  id: "01a05fc6-81fd-7f0e-82af-5f52794a8b51",
  type: "page-type/rrule-property",
  slug: "rrule-rule",
  propertySlug: "rrule-rule",
  definition: "how often a task comes round again",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A recurrence is written as an RFC 5545 RRULE without its `RRULE:` opener.",
    },
  ],
  types: "ts",
} as const satisfies RruleProperty
