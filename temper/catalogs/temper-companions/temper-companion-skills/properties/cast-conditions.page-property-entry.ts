import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type CastConditions = "jsonl"

export const castConditions = {
  id: "01a06197-3a25-77c0-86b3-5e7cc53ae0c5",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "cast-conditions",
  propertySlug: "cast-conditions",
  definition: "what must have before a companion casts a skill, one test to a line",
  properties: [
    { pageProperty: "text-property/cast-condition-type", required: true, many: false },
    { pageProperty: "number-property/health-below", required: false, many: false },
    { pageProperty: "text-property/target-type", required: false, many: false },
    { pageProperty: "number-property/min-distance", required: false, many: false },
    { pageProperty: "boolean-property/is-movable", required: false, many: false },
    { pageProperty: "text-property/enemy-types", required: false, many: true, maxCount: null },
    {
      pageProperty: "record-property/effect-conditions",
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
