import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Achievements = "jsonl"

export const achievements = {
  id: "01a06168-7245-7004-8aa0-eba39e83a4e6",
  pageTypeSlug: "page-property-entry",
  slug: "achievements",
  propertySlug: "achievements",
  definition: "the achievements a heading holds, one achievement to a line",
  properties: [
    { pagePropertySlug: "eso-achievement-id", required: true, many: false },
    { pagePropertySlug: "achievement-name", required: true, many: false },
    { pagePropertySlug: "achievement-points", required: true, many: false },
    { pagePropertySlug: "total-steps", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An achievement here is one the game files under the heading carrying the line.",
    },
    {
      invariantKind: "departure",
      statement: "The lines run in ascending order of the achievement id.",
    },
  ],
} as const satisfies PagePropertyEntry
