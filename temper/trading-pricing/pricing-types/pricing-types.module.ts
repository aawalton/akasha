import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const pricingTypes = {
  id: "01a0609b-e59d-774e-9760-26cd46ca0f8b",
  pageTypeSlug: "module",
  slug: "pricing-types",
  definition: "the shape a Tamriel Trade Centre price dump takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No field of a price entry is required.",
    },
    {
      invariantKind: "departure",
      statement: "A price is found by walking from item to quality to level to trait.",
    },
    {
      invariantKind: "departure",
      statement: "A field name here keeps Tamriel Trade Centre's spelling.",
    },
  ],
} as const satisfies Module
