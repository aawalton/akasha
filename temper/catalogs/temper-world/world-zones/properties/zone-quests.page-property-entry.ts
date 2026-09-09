import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type ZoneQuests = "jsonl"

export const zoneQuests = {
  id: "01a06167-3f9b-700a-9b12-ff06441e9392",
  pageTypeSlug: "page-property-entry",
  slug: "zone-quests",
  propertySlug: "zone-quests",
  definition: "the quests a zone holds, one quest to a line",
  properties: [
    { pagePropertySlug: "number-property/eso-quest-id", required: true, many: false },
    { pagePropertySlug: "text-property/quest-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A quest here is a quest the game counts against the zone that quest is given in.",
    },
  ],
} as const satisfies PagePropertyEntry
