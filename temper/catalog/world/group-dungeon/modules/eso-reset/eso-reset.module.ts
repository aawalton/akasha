import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoReset = {
  id: "01a0603b-d66a-7bf8-9657-cb2176247f1b",
  type: "page-type/module",
  slug: "eso-reset",
  definition: "when the game's day last turned over, counted in whole seconds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day here turns over at six in the morning in New York.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The saving-time rule of today is applied to every year.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Lua compiled for the game reaches no Date and no clock of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every instant here is a whole second rather than a millisecond.",
    },
  ],
  createdAt: "2026-09-02T03:48:49.386Z",
  updatedAt: "2026-09-21T15:28:00.000Z",
} as const satisfies Module
