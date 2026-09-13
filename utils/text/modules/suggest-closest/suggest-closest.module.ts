import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const suggestClosest = {
  id: "01a06287-7841-7b53-968b-a40343c7aebe",
  type: "module",
  slug: "suggest-closest",
  definition: "the candidate nearest a mistyped word by edit distance",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A candidate further than the distance given is named to nobody.",
    },
    {
      invariantKind: "constraint",
      statement: "Among candidates at equal distance the candidate met first is named.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal over a misspelled name works the nearest name out here.",
    },
    {
      invariantKind: "departure",
      statement: "The phrase such a refusal appends is composed here rather than by that refusal.",
    },
    {
      invariantKind: "departure",
      statement: "How near a name must be for a refusal to point at it is held here.",
    },
    {
      invariantKind: "departure",
      statement: "A word near no candidate is answered with nothing to append.",
    },
    {
      invariantKind: "departure",
      statement: "The phrase opens with the space joining it to the sentence before it.",
    },
  ],
} as const satisfies Module
