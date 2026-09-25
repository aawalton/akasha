import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperPublicDungeon = {
  id: "01a0d89e-8371-74e9-89b8-8064ba78445b",
  type: "page-type/page-type",
  slug: "temper-public-dungeon",
  definition: "an open dungeon whose group event hands each character a skill point",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["module/public-dungeon-pages", "text-property/zone-key"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/eso-zone-id", required: true, many: false },
    { pageProperty: "text-property/zone-key", required: true, many: false },
    { pageProperty: "number-property/eso-achievement-id", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A public dungeon's zone id is the number the game gives the dungeon itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A public dungeon names the zone it is in by the skill point finder's key rather than by a zone page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Telvanni Peninsula has no world zone page, and Blackreach: Greymoor Caverns states no zone id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A public dungeon names its achievement by the game's number, since no achievement has a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The public dungeons are shown in the order their display order gives.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
