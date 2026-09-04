import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCardCheckerTypes = {
  id: "01a06108-2fec-7da2-b7d1-16867e88fcd1",
  pageTypeSlug: "module",
  slug: "completion-card-checker-types",
  definition: "the shape of what answers whether one completion card is finished",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
