import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type Conditions = "jsonl"

export const conditions = {
  id: "01a05fd0-3aa4-739a-82b0-6e5a2647ad05",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "conditions",
  propertySlug: "conditions",
  definition: "what an item must satisfy for a rule to act, one test to a line",
  properties: [
    { pageProperty: "relation-property/condition-field", required: true, many: false },
    { pageProperty: "text-property/condition-value", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule stating no condition matches every item of its category.",
    },
    {
      invariantKind: "departure",
      statement: "A field names a temper-condition-field page with the key the field tests.",
    },
    {
      invariantKind: "departure",
      statement: "The key a rule engine reads is held by that page rather than written here.",
    },
    {
      invariantKind: "gap",
      statement: "A field naming a comparison has the key of a temper comparison op.",
    },
  ],
} as const satisfies PagePropertyEntry
