import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scalarText = {
  id: "01a0909a-b4dc-7909-b0f7-ac79aba83569",
  type: "module",
  slug: "scalar-text",
  definition: "the text a string, a number or a boolean is written as, or nothing",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A string is answered as that string is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number or a boolean is answered as the text of that value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other value is nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty string is answered rather than read as nothing.",
    },
  ],
} as const satisfies Module
