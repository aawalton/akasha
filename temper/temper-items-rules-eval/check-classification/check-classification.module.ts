import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkClassification = {
  id: "01a06137-f962-70e4-b657-15f603e5b645",
  pageTypeSlug: "module",
  slug: "check-classification",
  definition: "the condition check over an item's sellability, name, trait, and set source type",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item whose merchant value is zero or absent fails the can-sell condition.",
    },
    {
      invariantKind: "departure",
      statement: "Companion equippability is decided by a trait type in the range 34 through 60.",
    },
    {
      invariantKind: "departure",
      statement: "A set id with no category mapping is treated as the no-type source type.",
    },
    {
      invariantKind: "absence",
      statement: "An item carrying no set id skips the set source type check entirely.",
    },
  ],
} as const satisfies Module
