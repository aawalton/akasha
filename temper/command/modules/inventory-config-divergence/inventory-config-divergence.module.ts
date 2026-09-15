import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryConfigDivergence = {
  id: "01a0964a-e089-7068-b37d-04f4d57c8d1f",
  type: "module",
  slug: "inventory-config-divergence",
  definition:
    "the rules the records compile to, set against the rules the configuration the addon reads holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule is set against the rule of the same id the configuration holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rules compiled here carry the rules automation controls, as the configuration does.",
    },
    {
      invariantKind: "departure",
      statement: "Two values hold the same thing whatever order their keys are written in.",
    },
    {
      invariantKind: "departure",
      statement: "A rule on one side and not on the other is a divergence.",
    },
    {
      invariantKind: "departure",
      statement: "The rule closing the compiled order carries no id, so nothing is set against it.",
    },
  ],
} as const satisfies Module
