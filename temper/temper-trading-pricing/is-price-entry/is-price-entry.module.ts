import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const isPriceEntry = {
  id: "01a0609b-e59d-7da9-bc7e-7689f71e4f0f",
  pageTypeSlug: "module",
  slug: "is-price-entry",
  definition: "whether a branch of a price dump is a price rather than a further branch",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A branch carrying a price field is a price.",
    },
    {
      invariantKind: "departure",
      statement: "Every lookup asks here rather than asking the same question its own way.",
    },
  ],
} as const satisfies Module
