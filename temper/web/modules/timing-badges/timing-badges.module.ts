import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const timingBadges = {
  id: "01a06421-2523-7dae-9237-ae7ee8a3066a",
  type: "page-type/module",
  slug: "timing-badges",
  definition: "the badges naming when a skill effect lands",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages, spelled as the game spells it.",
    },
  ],
} as const satisfies Module
