import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const temperQueryErrorBoundary = {
  id: "01a0e2ef-9f7b-7112-92f7-3db49e72b28f",
  type: "page-type/module",
  slug: "temper-query-error-boundary",
  definition: "the query error boundary a Temper screen holds, worded by web phrase pages",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failure shows the same generic wording whatever the error was.",
    },
  ],
  createdAt: "2026-09-27T12:55:49.883Z",
  updatedAt: "2026-09-27T12:55:59.000Z",
} as const satisfies Module
