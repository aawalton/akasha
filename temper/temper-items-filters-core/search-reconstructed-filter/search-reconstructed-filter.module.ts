import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchReconstructedFilter = {
  id: "01a0613a-e0ad-779f-95eb-2ce9443f70a6",
  pageTypeSlug: "module",
  slug: "search-reconstructed-filter",
  definition:
    "whether an item was reconstructed from a known set piece, narrowed by an include or exclude toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reconstructed filter reads the flag through the rule-editor flags checker.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
