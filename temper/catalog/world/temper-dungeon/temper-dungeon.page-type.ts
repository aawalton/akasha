import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperDungeon = {
  id: "01a05fc4-7a8e-73b2-936f-9e3b86b17549",
  type: "page-type/page-type",
  slug: "temper-dungeon",
  definition: "a group instance a party fights through together",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/dungeon-quest-id",
    "number-property/rotation-position",
    "relation-property/quest-giver",
    "text-property/solo-difficulty",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "relation-property/quest-giver", required: true, many: false },
    { pageProperty: "number-property/rotation-position", required: true, many: false },
    { pageProperty: "text-property/solo-difficulty", required: true, many: false },
    { pageProperty: "number-property/eso-zone-id", required: false, many: false },
    { pageProperty: "text-property/zone-key", required: false, many: false },
    { pageProperty: "number-property/dungeon-quest-id", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dungeon's zone id is the number the game gives the dungeon itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dungeon names the zone it is in by the skill point finder's key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dungeon's quest is the quest whose finishing hands a character a skill point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The skill point finder lists the dungeons in their display order.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
