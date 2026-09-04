import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemFilterTypeConstants = {
  id: "01a06127-6642-7422-baf1-357f6f2e6d5f",
  pageTypeSlug: "module",
  slug: "item-filter-type-constants",
  definition:
    "the inventory filter numbers the game client holds, each under the name the client spells it with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each number is read out of the client rather than written down here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a number into display text.",
    },
  ],
} as const satisfies Module
