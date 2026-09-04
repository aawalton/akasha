import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionMergeForward = {
  id: "01a06108-2ff2-712b-8e7f-f0ad0e33cc0d",
  pageTypeSlug: "module",
  slug: "completion-merge-forward",
  definition: "folding a fresh reading of a player's progress into what was already counted",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A count merged forward never falls.",
    },
    {
      invariantKind: "departure",
      statement: "A handful of fields take the fresh reading whole rather than merging.",
    },
  ],
} as const satisfies Module
