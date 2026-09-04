import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const conditionEvaluator = {
  id: "01a06152-c2d9-7bfd-bdcf-e47f851e9b16",
  pageTypeSlug: "module",
  slug: "condition-evaluator",
  definition: "how a companion skill's conditions are resolved during a rotation",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An unrecognised condition type is treated as satisfied.",
    },
    {
      invariantKind: "departure",
      statement: "A health threshold's uptime is estimated from the enemy's starting health.",
    },
    {
      invariantKind: "gap",
      statement:
        "Health-threshold conditions are the only kind contributing to the effective multiplier.",
    },
  ],
} as const satisfies Module
