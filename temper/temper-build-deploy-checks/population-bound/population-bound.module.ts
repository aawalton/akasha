import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const populationBound = {
  id: "01a06287-7841-72c9-bcad-ce7b9ecfcd04",
  pageTypeSlug: "module",
  slug: "population-bound",
  definition: "the note saying how much of a population a run examined",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A run over an empty population certifies nothing.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The count examined and the count declared are read from two separate measurements.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller handing the same count twice reports no shortfall.",
    },
    {
      invariantKind: "constraint",
      statement: "A record naming both counts does not stop a caller handing the same count twice.",
    },
    {
      invariantKind: "departure",
      statement: "Every call site is rewritten on its way into akasha.",
    },
  ],
} as const satisfies Module
