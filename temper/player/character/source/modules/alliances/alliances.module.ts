import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alliances = {
  id: "01a060ea-ac5c-7ddc-8beb-424cc85a9621",
  type: "page-type/module",
  slug: "alliances",
  definition: "the three alliances a character fights for, and no alliance at all",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Alliances are read from their temper-alliance pages, in the order of their hash places.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The alliance pages are held wherever the skill catalogue is held.",
    },
  ],
} as const satisfies Module
