import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const isPriceEntry = {
  id: "01a0609b-e59d-7da9-bc7e-7689f71e4f0f",
  type: "module",
  slug: "is-price-entry",
  definition: "whether a branch of a price dump is a price rather than a further branch",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A branch with a price field is a price.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every lookup asks here rather than asking the same question its own way.",
    },
  ],
} as const satisfies Module
