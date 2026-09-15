import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const verdictShape = {
  id: "01a05c87-a161-78d7-afb2-6becb8d2161f",
  type: "page-type/module",
  slug: "verdict-shape",
  definition: "what a judgement has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here exists at runtime.",
    },
  ],
} as const satisfies Module
