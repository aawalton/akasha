import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type CastConditions = "jsonl"

export const castConditions = {
  id: "01a06197-3a25-77c0-86b3-5e7cc53ae0c5",
  pageTypeSlug: "page-property-entry",
  slug: "cast-conditions",
  propertySlug: "cast-conditions",
  definition: "what must have before a companion casts a skill, one test to a line",
  properties: [
    { pagePropertySlug: "text-property/cast-condition-type", required: true, many: false },
    { pagePropertySlug: "number-property/health-below", required: false, many: false },
    { pagePropertySlug: "text-property/target-type", required: false, many: false },
    { pagePropertySlug: "number-property/min-distance", required: false, many: false },
    { pagePropertySlug: "boolean-property/is-movable", required: false, many: false },
    { pagePropertySlug: "text-property/enemy-types", required: false, many: true, maxCount: null },
    {
      pagePropertySlug: "record-property/effect-conditions",
      required: false,
      many: true,
      maxCount: null,
    },
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
      statement: "A test gathering several tests has each gathered test.",
    },
    {
      invariantKind: "constraint",
      statement: "A skill tested by nothing states no test rather than an empty list.",
    },
  ],
} as const satisfies PagePropertyEntry
