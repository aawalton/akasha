import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const toughnessPerSecond = {
  id: "01a1401f-7dda-79c3-ab0f-a1eba03597fa",
  type: "page-type/module",
  slug: "toughness-per-second",
  definition: "the mean, over a fight's ticks, of the single hit that would kill a character",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick is one second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Max health counts whole in every tick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shield counts its full size in every tick it is up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heal counts in the tick it lands in, overheal included.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Toughness per second is divided by the share of damage armor and damage taken leave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Half the damage is martial and half is magical.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Physical resistance and martial damage taken work on martial damage, each resistance up to half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Spell resistance and magical damage taken work on magical damage, each resistance up to half.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "Reductions to damage taken are added together, as no capture has settled whether they multiply.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No enemy penetration lowers the armor.",
    },
  ],
  createdAt: "2026-10-15T15:12:48.089Z",
  updatedAt: "2026-10-20T13:29:19.208Z",
} as const satisfies Module
