import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionFormulaEvaluator = {
  id: "01a06152-c2c8-7842-b7a4-49754c4f6418",
  pageTypeSlug: "module",
  slug: "companion-formula-evaluator",
  definition: "the number a companion metric's formula tree works out to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Arithmetic nodes are delegated to a shared framework evaluator.",
    },
    {
      invariantKind: "constraint",
      statement: "An arithmetic node reaching the leaf evaluator throws.",
    },
    {
      invariantKind: "gap",
      statement: "A metric reference missing from the value map reads as zero.",
    },
  ],
} as const satisfies Module
