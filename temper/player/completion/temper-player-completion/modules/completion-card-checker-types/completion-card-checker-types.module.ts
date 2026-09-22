import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCardCheckerTypes = {
  id: "01a06108-2fec-7da2-b7d1-16867e88fcd1",
  type: "page-type/module",
  slug: "completion-card-checker-types",
  definition: "the shape of what answers whether a completion card is finished",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
