import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemLevelPlaces = {
  id: "01a15a64-a4e0-7ccd-8995-04cf2600a124", type: "page-type/module",
  slug: "item-level-places",
  definition: "the place a piece's item level takes in a build hash",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Place zero is a piece whose level is not said, and is read as CP160.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Places one to fifty are the character levels one to fifty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each place above fifty is ten champion points more, up to CP160.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece the game says needs champion points takes the champion level's place.",
    },
  ], createdAt: "2026-10-20T17:38:27.679Z", updatedAt: "2026-10-20T17:38:27.679Z",
} as const satisfies Module
