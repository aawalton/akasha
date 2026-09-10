import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type Progress = "jsonl"

export const progress = {
  id: "01a05fd3-435e-7d0d-8c81-036d195632f1",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "progress",
  propertySlug: "progress",
  definition: "how far a task has come, one character to a line",
  renderedAs: "progress",
  properties: [
    { pageProperty: "text-property/character-name", required: true, many: false },
    { pageProperty: "number-property/progress-total", required: true, many: false },
    { pageProperty: "number-property/progress-current", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The totals a task states are the totals of these lines added up.",
    },
    {
      invariantKind: "gap",
      statement: "A line names a character by name rather than by a relation to that character.",
    },
  ],
} as const satisfies PagePropertyEntry
