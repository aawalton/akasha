import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const dashBetweenWords = {
  id: "01a08e73-15cd-74c8-9abf-c1974f4b4e89",
  pageTypeSlug: "module",
  type: "module",
  slug: "dash-between-words",
  definition: "a name rewritten with a dash where one word runs into the next",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A capital opening the name is lowered where no letter sits before it to dash.",
    },
    {
      invariantKind: "absence",
      statement: "A run of capitals holds no word break, so nothing is dashed inside it.",
    },
  ],
} as const satisfies Module
