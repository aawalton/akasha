import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Antiquities = "jsonl"

export const antiquities = {
  id: "01a06166-503b-7004-a13a-ad8c499bf773",
  pageTypeSlug: "page-property-entry",
  slug: "antiquities",
  propertySlug: "antiquities",
  definition: "the antiquities a category has, one antiquity to a line",
  properties: [
    { pagePropertySlug: "number-property/eso-antiquity-id", required: true, many: false },
    { pagePropertySlug: "text-property/antiquity-name", required: true, many: false },
    { pagePropertySlug: "number-property/eso-antiquity-set-id", required: true, many: false },
    { pagePropertySlug: "number-property/total-lore-entries", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An antiquity here is an antiquity a player digs up and reads lore from.",
    },
  ],
} as const satisfies PagePropertyEntry
