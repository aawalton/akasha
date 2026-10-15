import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const toughnessPerSecond = {
  id: "01a1401f-7dda-79c3-ab0f-a1eba03597fa",
  type: "page-type/module",
  slug: "toughness-per-second",
  definition: "the damage a character can take each second of a fight and live",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Toughness per second is max health plus healing and full shields, over the fight's seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Toughness per second is divided by the share of damage armor and damage taken leave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Armor is the mean of physical and spell resistance, each up to half the damage.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No enemy penetration lowers the armor.",
    },
  ],
  createdAt: "2026-10-15T15:12:48.089Z",
  updatedAt: "2026-10-15T15:12:48.089Z",
} as const satisfies Module
