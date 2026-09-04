import type { Module } from "@akasha/code-system/module"

export const inventoryItemFacts = {
  id: "01a068e2-226e-7e6c-9675-79e0e369017b",
  pageTypeSlug: "module",
  slug: "inventory-item-facts",
  definition: "the facts a rule walk reads off one item held in a place",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item's key is worked out from the item rather than said by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "An item with no place named is still read.",
    },
  ],
} as const satisfies Module
