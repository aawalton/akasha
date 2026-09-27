import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const targetingBadges = {
  id: "01a06421-2523-7b65-804e-4591f14e557d",
  type: "page-type/module",
  slug: "targeting-badges",
  definition: "the badges naming what a skill effect reaches",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages, spelled as the game spells it.",
    },
  ],
} as const satisfies Module
