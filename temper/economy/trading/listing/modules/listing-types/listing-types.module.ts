import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const listingTypes = {
  id: "01a060a7-02f2-7740-a4a8-e0a86342e424",
  type: "page-type/module",
  slug: "listing-types",
  definition: "the shape a guild store listing takes where the add-on saves it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A listing's shape and a zod shape in this module's test are held equal at typecheck.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing has the price for the stack and the price for one item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing has the second of capture.",
    },
  ],
} as const satisfies Module
