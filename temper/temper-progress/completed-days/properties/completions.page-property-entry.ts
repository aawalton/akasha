import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Completions = "jsonl"

export const completions = {
  id: "01a05fe1-6aff-73d2-a611-635b84e2deee",
  pageTypeSlug: "page-property-entry",
  slug: "completions",
  propertySlug: "completions",
  definition: "the tasks marked done on a day, one completion to a line",
  properties: [
    { pagePropertySlug: "instant-property/completed-at", required: true, many: false },
    { pagePropertySlug: "text-property/task", required: false, many: false },
    { pagePropertySlug: "text-property/title", required: false, many: false },
    { pagePropertySlug: "text-property/character", required: false, many: false },
    { pagePropertySlug: "text-property/eso-character-id", required: false, many: false },
    { pagePropertySlug: "text-property/due-date", required: false, many: false },
    { pagePropertySlug: "text-property/completion-card-id", required: false, many: false },
    {
      pagePropertySlug: "text-property/completion-item-path",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line holds the facts true of the completion rather than of the task.",
    },
    {
      invariantKind: "departure",
      statement: "A task's name and how often a task comes round is read from the task.",
    },
    {
      invariantKind: "departure",
      statement: "A line outlives the task the line was written from.",
    },
    {
      invariantKind: "departure",
      statement: "A completion naming no task states a title.",
    },
    {
      invariantKind: "gap",
      statement: "A line naming a task the tasks no longer hold loses the facts that task stated.",
    },
    {
      invariantKind: "gap",
      statement: "A completion temper gave no name lands with no title.",
    },
  ],
} as const satisfies PagePropertyEntry
