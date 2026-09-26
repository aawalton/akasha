import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metricReading = {
  id: "01a0de73-1713-74bd-aea0-cc41151a61a8",
  type: "page-type/module",
  slug: "metric-reading",
  definition: "the reading of the stats a build is measured by from their pages and formulas",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat's id is its page's slug and its name is its page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat is handed the formula filed under its slug, and none where none is filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads a file, so a browser and a server read stats alike.",
    },
  ],
} as const satisfies Module
