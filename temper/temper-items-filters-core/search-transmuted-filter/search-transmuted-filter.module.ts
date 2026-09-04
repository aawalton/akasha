import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchTransmutedFilter = {
  id: "01a0613a-e0b1-73d3-90ad-04d99f112113",
  pageTypeSlug: "module",
  slug: "search-transmuted-filter",
  definition: "whether an item trait was transmuted, narrowed by an include or exclude toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The transmuted filter reads the transmuted flag through the rule-editor flags checker.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
