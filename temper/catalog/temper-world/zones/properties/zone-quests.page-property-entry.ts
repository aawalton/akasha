import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type ZoneQuests = "jsonl"

export const zoneQuests = {
  id: "01a06167-3f9b-700a-9b12-ff06441e9392",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "zone-quests",
  propertySlug: "zone-quests",
  definition: "the quests a zone holds, one quest to a line",
  properties: [
    { pageProperty: "number-property/eso-quest-id", required: true, many: false },
    { pageProperty: "text-property/quest-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A quest here is a quest the game counts against the zone that quest is given in.",
    },
  ],
} as const satisfies PagePropertyEntry
