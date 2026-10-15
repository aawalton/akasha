import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillDamage = {
  id: "01a13fef-5e7e-711d-90eb-ebfc00e306bb",
  type: "page-type/module",
  slug: "skill-damage",
  definition: "the direct damage one cast of a skill deals, read from the tooltip the game gave it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Direct damage is a hit on landing, or a wave at each interval the tooltip states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the first damage a tooltip deals counts.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Damage over time is not direct damage.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A hit lands on one enemy, without a critical strike or any modifier on the tooltip.",
    },
  ],
  createdAt: "2026-10-15T14:20:14.333Z",
  updatedAt: "2026-10-15T14:20:14.333Z",
} as const satisfies Module
