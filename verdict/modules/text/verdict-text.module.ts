import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const verdictText = {
  id: "01a05c87-a162-7009-8991-e7d36b476492",
  type: "module",
  slug: "verdict-text",
  definition: "what a judgement covered, written out for a person to read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A coverage with no denominator says the denominator was not computed.",
    },
  ],
} as const satisfies Module
