import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterRotationReading = {
  id: "01a1557f-ab1f-77ac-8712-4cb4dff8f2b5",
  type: "page-type/module",
  slug: "character-rotation-reading",
  definition: "the toughness, damage and healing a character has each second over a rotation",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skills and their tooltips are read from the character's last reading of each bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character with a bar whose reading kept no skills is refused until a reload keeps them.",
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
      statement: "Reaving Blows, where slotted, heals its share of the direct damage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heal is scaled by the average critical heal and by healing done and taken.",
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
      statement: "Max health, armor and damage taken are the mean of both bars' readings.",
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
  createdAt: "2026-10-19T18:49:52.670Z",
  updatedAt: "2026-10-19T19:13:27.002Z",
} as const satisfies Module
