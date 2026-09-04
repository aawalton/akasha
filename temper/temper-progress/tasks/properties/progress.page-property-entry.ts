import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Progress = "jsonl"

export const progress = {
  id: "01a05fd3-435e-7d0d-8c81-036d195632f1",
  pageTypeSlug: "page-property-entry",
  slug: "progress",
  propertySlug: "progress",
  definition: "how far a task has come, one character to a line",
  properties: [
    { pagePropertySlug: "character-name", required: true, many: false },
    { pagePropertySlug: "progress-total", required: true, many: false },
    { pagePropertySlug: "progress-current", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
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
