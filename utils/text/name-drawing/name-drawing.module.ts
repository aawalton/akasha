import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const nameDrawing = {
  id: "01a08206-a5c1-75c9-8635-b646938fd3ac",
  type: "module",
  slug: "name-drawing",
  definition: "names drawn each in backticks and parted, for a line a caller reads",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each name is drawn in backticks.",
    },
    {
      invariantKind: "departure",
      statement: "The names are parted by what the caller hands over.",
    },
    {
      invariantKind: "departure",
      statement: "A caller handing nothing over parts the names by a comma and a space.",
    },
    {
      invariantKind: "departure",
      statement: "The names are drawn in the order the caller handed them over.",
    },
    {
      invariantKind: "departure",
      statement: "No name at all is drawn as an empty line.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows whether a name is an act or a flag.",
    },
  ],
} as const satisfies Module
