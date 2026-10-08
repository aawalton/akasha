import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const comparisonOp = {
  id: "01a060d9-44ca-7638-bf00-7199306fb945",
  type: "page-type/module",
  slug: "comparison-op",
  definition: "a numeric comparison carried out under the operator naming it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every operator the comparison table names is answered here.",
    },
  ],
  createdAt: "2026-09-02T06:40:46.794Z",
  updatedAt: "2026-09-22T10:17:05.000Z",
} as const satisfies Module
