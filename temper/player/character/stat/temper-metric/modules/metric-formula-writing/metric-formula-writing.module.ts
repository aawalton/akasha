import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metricFormulaWriting = {
  id: "01a0df23-f4cf-7ea2-96a5-01f61b7e5dee",
  type: "page-type/module",
  slug: "metric-formula-writing",
  definition: "the body of the code file holding a stat's formula",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every writer of a stat's formula file writes it through this.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is quoted only where it is no name code could spell bare.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The formatter has the last word on how the body is laid out.",
    },
  ],
} as const satisfies Module
