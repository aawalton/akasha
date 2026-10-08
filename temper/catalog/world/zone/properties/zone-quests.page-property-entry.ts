import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const zoneQuests = {
  id: "01a06167-3f9b-700a-9b12-ff06441e9392",
  type: "page-type/page-property-entry",
  slug: "zone-quests",
  propertySlug: "zone-quests",
  definition: "the quests a zone holds, one quest to a line",
  properties: [
    { pageProperty: "number-property/eso-quest-id", required: true, many: false },
    { pageProperty: "text-property/quest-name", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest here is a quest the game counts against the zone that quest is given in.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T09:15:51.579Z",
  updatedAt: "2026-09-21T15:28:00.000Z",
} as const satisfies PagePropertyEntry
