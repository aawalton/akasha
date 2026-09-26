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
  ],
} as const satisfies Module
