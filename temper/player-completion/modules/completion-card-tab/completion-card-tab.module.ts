import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCardTab = {
  id: "01a06103-0618-76fd-8539-d368cdcf6cae",
  type: "module",
  slug: "completion-card-tab",
  definition: "which of the three tabs of the completion window a card is shown under",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A card is answered for by its own identifier alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Anything hung beneath a card answers for that card's tab.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An identifier hung under two tabs answers for neither.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tree answered from is handed in, and the static tree where it is not.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An achievement heading answers only once a tree with that heading is handed in.",
    },
  ],
} as const satisfies Module
