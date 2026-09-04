import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const comparisonOp = {
  id: "01a060d9-44ca-7638-bf00-7199306fb945",
  pageTypeSlug: "module",
  slug: "comparison-op",
  definition: "one numeric comparison carried out under the operator naming it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every operator the comparison table names is answered here.",
    },
  ],
} as const satisfies Module
