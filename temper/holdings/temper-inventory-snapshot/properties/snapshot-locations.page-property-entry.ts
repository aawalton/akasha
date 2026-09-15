import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const snapshotLocations = {
  id: "01a0675a-f185-70ca-b3c9-47a893495e70",
  type: "page-type/page-property-entry",
  slug: "snapshot-locations",
  propertySlug: "locations",
  definition: "what each bag holder was named and when it was last read, one holder to a line",
  properties: [
    { pageProperty: "text-property/location-id", required: true, many: false },
    { pageProperty: "text-property/eso-display-name", required: true, many: false },
    { pageProperty: "instant-property/last-scanned-at", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one bag holder a reading found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "When a holder was last read is the holder's own moment rather than the reading's.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
