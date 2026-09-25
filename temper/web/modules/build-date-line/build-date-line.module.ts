import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildDateLine = {
  id: "01a0d6db-3513-7e6e-900d-32de1dfa4c87",
  type: "page-type/module",
  slug: "build-date-line",
  definition: "the line saying when a build was created or last updated",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build updated after it was created says when it was updated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build with neither time says no date rather than the start of the epoch.",
    },
  ],
} as const satisfies Module
