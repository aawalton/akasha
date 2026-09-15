import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nameDrawing = {
  id: "01a08206-a5c1-75c9-8635-b646938fd3ac",
  type: "page-type/module",
  slug: "name-drawing",
  definition: "names drawn each in backticks and parted, for a line a caller reads",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each name is drawn in backticks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are parted by what the caller hands over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller handing nothing over parts the names by a comma and a space.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are drawn in the order the caller handed them over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No name at all is drawn as an empty line.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows whether a name is an act or a flag.",
    },
  ],
} as const satisfies Module
