import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rotationReading = {
  id: "01a155a6-255f-774a-8cbf-800fdcde0042",
  type: "page-type/module",
  slug: "rotation-reading",
  definition: "the toughness, damage and healing each second over a rotation of two bars",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The calculation takes plain inputs, so the add-on and Bun run the same code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The fight is ten minutes long.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Toughness is the mean over the fight's ticks of the hit that would kill the character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Damage is the direct damage of the skills, the weapon enchant and the attacks, over the fight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Healing is the healing landed each second and the shields given each second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon enchant is the mean of both bars.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A light and a heavy attack deal the mean of what both bars' weapons deal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Reaving Blows, where slotted, heals the share of the direct damage its text names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Direct damage is scaled by the average critical strike before Reaving Blows takes its share.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A shield is not scaled by a critical heal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The multipliers are the mean of the bars that have them, and plain where none do.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A weapon enchant goes off at the end of every fourth tick; Reaving Blows heals in its hit's tick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ultimate's cost and the healing each point spent gives are the mean of both bars.",
    },
  ],
  createdAt: "2026-10-19T19:31:54.334Z",
  updatedAt: "2026-10-19T19:31:54.334Z",
} as const satisfies Module
