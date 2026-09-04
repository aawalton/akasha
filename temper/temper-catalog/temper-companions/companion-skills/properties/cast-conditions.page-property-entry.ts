import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type CastConditions = "jsonl"

export const castConditions = {
  id: "01a06197-3a25-77c0-86b3-5e7cc53ae0c5",
  pageTypeSlug: "page-property-entry",
  slug: "cast-conditions",
  propertySlug: "cast-conditions",
  definition: "what must hold before a companion casts a skill, one test to a line",
  properties: [
    { pagePropertySlug: "cast-condition-type", required: true, many: false },
    { pagePropertySlug: "health-below", required: false, many: false },
    { pagePropertySlug: "target-type", required: false, many: false },
    { pagePropertySlug: "min-distance", required: false, many: false },
    { pagePropertySlug: "is-movable", required: false, many: false },
    { pagePropertySlug: "enemy-types", required: false, many: true, max: null },
    { pagePropertySlug: "effect-conditions", required: false, many: true, max: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test names which kind of test the test is.",
    },
    {
      invariantKind: "departure",
      statement: "Which fields a test carries beyond its kind follows from that kind.",
    },
    {
      invariantKind: "departure",
      statement: "A test gathering several tests carries each gathered test.",
    },
    {
      invariantKind: "constraint",
      statement: "A skill tested by nothing states no test rather than an empty list.",
    },
  ],
} as const satisfies PagePropertyEntry
