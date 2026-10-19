import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mundusSource = {
  id: "01a061a7-9bb1-778e-b38f-f397e2f754ea",
  type: "page-type/module",
  slug: "mundus-source",
  definition: "the boon each mundus stone gives a character, and what divines armor adds",
  code: "ts",
  test: "ts",
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
      decisionKind: "decision-kind/stopgap",
      statement: "A percentage boon is left as the stone states it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A boon under Divines floors its base times one plus the unrounded shares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A boon with a scale then floors its scale times that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A boon's tooltip number is not the value the character gets.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "Lady and Lover stats on other characters match the truncated tooltip form, not yet isolated.",
    },
  ],
  createdAt: "2026-09-02T10:26:09.457Z",
  updatedAt: "2026-10-19T22:25:16.595Z",
} as const satisfies Module
