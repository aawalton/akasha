import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const enumValueLabels = {
  id: "01a06127-662d-77a9-a9a1-5fcbf970d172",
  pageTypeSlug: "module",
  slug: "enum-value-labels",
  definition:
    "the display text the game client gives each number of one enumeration, gathered under that number",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The caller names the string prefix its enumeration answers to.",
    },
    {
      invariantKind: "departure",
      statement: "A number the client gives no text for is left out.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which enumeration the caller handed in.",
    },
  ],
} as const satisfies Module
