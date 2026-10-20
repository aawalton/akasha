import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const wornItemLevels = {
  id: "01a15a76-74bd-7eb4-bedd-5978bf822f01",
  type: "page-type/module",
  slug: "worn-item-levels",
  definition: "each worn piece's item level and glyph level, as a reading says them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece the build holds no level for takes the level its worn piece says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A worn piece says its level by the level and champion points it requires.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A worn piece kept before those were read says its level by its link.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link below level fifty says that character level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A link at level fifty says its level by its subtype, as the game's items place it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A subtype is placed by every link at level fifty the game gave a required level for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subtype the game's items give two levels for is placed nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A link at level fifty whose subtype is placed nowhere says no level and is marked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A worn piece's glyph level is its link's field after the glyph subtype.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A worn piece is matched to the build by the game's equip slot.",
    },
  ],
  createdAt: "2026-10-20T17:57:55.005Z",
  updatedAt: "2026-10-20T18:14:28.432Z",
} as const satisfies Module
