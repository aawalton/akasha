import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const suggestClosest = {
  id: "01a06287-7841-7b53-968b-a40343c7aebe",
  pageTypeSlug: "module",
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
  ],
} as const satisfies Module
