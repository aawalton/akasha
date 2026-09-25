import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const conditions = {
  id: "01a05fd0-3aa4-739a-82b0-6e5a2647ad05",
  type: "page-type/page-property-entry",
  slug: "conditions",
  propertySlug: "conditions",
  definition: "what an item must satisfy for a rule to act, one test to a line",
  properties: [
    { pageProperty: "relation-property/condition-field", required: true, many: false },
    { pageProperty: "text-property/condition-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule stating no condition matches every item of its category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field names a temper-condition-field page with the key the field tests.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key a rule engine reads is held by that page rather than written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field naming a comparison has the temper comparison op page it compares by.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
