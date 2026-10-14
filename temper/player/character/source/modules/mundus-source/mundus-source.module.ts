import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mundusSource = {
  id: "01a061a7-9bb1-778e-b38f-f397e2f754ea",
  type: "page-type/module",
  slug: "mundus-source",
  definition: "the boon each mundus stone gives a character, and what divines armor adds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Mundus stones are read from their pages, in the order of their hash places.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mundus stone pages are held wherever the skill catalogue is held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Divines adds each piece's percent as a 32-bit float and floors the sum to tenths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A whole-number boon is floored once, after the Divines sum is applied.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A percentage boon is left as the stone states it.",
    },
  ],
  createdAt: "2026-09-02T10:26:09.457Z",
  updatedAt: "2026-10-14T19:00:49.884Z",
} as const satisfies Module
