import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchLockedFilter = {
  id: "01a0613a-e0aa-7943-ae0c-5c2ed6437954",
  pageTypeSlug: "module",
  slug: "search-locked-filter",
  definition:
    "whether an item is locked against sale or destruction, narrowed by an include or exclude toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The locked filter reads the locked flag through the rule-editor flags checker.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
