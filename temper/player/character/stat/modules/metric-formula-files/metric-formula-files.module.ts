import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metricFormulaFiles = {
  id: "01a0de73-1713-7598-b66f-9183a99a877a",
  type: "page-type/module",
  slug: "metric-formula-files",
  definition: "every stat's formula, found in the files beside the stat pages and keyed by slug",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A formula is code, so the bundler carries it rather than the page store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A formula is keyed by the slug its file is named for.",
    },
  ],
} as const satisfies Module
