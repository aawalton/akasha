import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperWorldSkyshard = {
  id: "01a0d5d4-6c80-7134-9ddd-a55a8ef382cc",
  type: "page-type/page-type",
  slug: "temper-world-skyshard",
  definition: "a skyshard in the game world and the maps it is shown on",
  pluralSlug: "skyshards",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/eso-achievement-id",
    "number-property/map-x",
    "number-property/map-y",
    "number-property/place-kinds",
    "number-property/shard-number",
    "record-property/map-positions",
    "relation-property/world-zone",
    "text-property/map-folder",
    "text-property/map-tile",
  ],
  properties: [
    { pageProperty: "number-property/eso-achievement-id", required: true, many: false },
    { pageProperty: "number-property/shard-number", required: true, many: false },
    { pageProperty: "relation-property/world-zone", required: true, many: false },
    { pageProperty: "record-property/map-positions", required: true, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skyshard is numbered by its achievement, so one zone may have two first skyshards.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skyshard names its achievement by the game's number, since no achievement has a page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
