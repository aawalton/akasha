import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const typeScale = {
  id: "01a0d8ec-bf2c-7168-a84c-a0284fc3084e",
  type: "page-type/module",
  slug: "type-scale",
  definition: "the game's keyboard type scale, named as the fonts the game draws",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A size is one of the game's keyboard steps: 13, 16, 18, 20, 24 and 30.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text is set in the game's own medium or bold face.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face is named by the placeholder the game's font strings fill in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every font here carries the game's thin or thick soft shadow.",
    },
  ],
  createdAt: "2026-09-25T14:16:29.228Z",
  updatedAt: "2026-10-18T17:23:25.067Z",
} as const satisfies Module
