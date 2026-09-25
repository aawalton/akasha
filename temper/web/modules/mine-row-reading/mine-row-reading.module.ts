import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mineRowReading = {
  id: "01a0d8d0-d4ed-7067-9018-4e495b5cba65",
  type: "page-type/module",
  slug: "mine-row-reading",
  definition: "the mined rows the mine page's parts hold, found by key or by name",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is read as the line the part holds, with the types that line gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is found by key only where the key the row holds is a number asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Parts stop being read once every key asked for is found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row is found by name where its name holds the text asked for, whatever the case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Parts stop being read once as many rows as asked for are found by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rows come back in the order the parts hold them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
