import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const confirmSetTarget = {
  id: "01a090a4-c227-7bc1-87d7-d7b98fe5499c",
  type: "page-type/module",
  slug: "confirm-set-target",
  definition: "setting a build as a waiting entity's target once the player has confirmed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A confirmation with no entity waiting sets no target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The entity stops waiting before the target is set.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A target whose arguments could not be worked out is left unset.",
    },
  ],
  createdAt: "2026-09-11T13:25:11.847Z",
  updatedAt: "2026-09-21T15:42:49.000Z",
} as const satisfies Module
