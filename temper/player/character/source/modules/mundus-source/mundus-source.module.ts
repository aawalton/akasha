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
      decisionKind: "decision-kind/departure",
      statement:
        "A percentage boon stating a base floors that base under Divines, then takes its scale.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A percentage boon stating no base is left as the stone states it.",
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
      statement: "A stone stating boon at tooltip applies its tooltip number under Divines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other stone applies its boon worked out exactly under Divines.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "Whether the tooltip number goes with the stone or with the stat kind is not yet isolated.",
    },
  ],
  createdAt: "2026-09-02T10:26:09.457Z",
  updatedAt: "2026-10-21T11:02:47.290Z",
} as const satisfies Module
