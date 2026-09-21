import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pricingTypes = {
  id: "01a0609b-e59d-774e-9760-26cd46ca0f8b",
  type: "page-type/module",
  slug: "pricing-types",
  definition: "the shape a Tamriel Trade Centre price dump takes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No field of a price entry is required.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A price is found by walking from item to quality to level to trait.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field name here keeps Tamriel Trade Centre's spelling.",
    },
  ],
} as const satisfies Module
