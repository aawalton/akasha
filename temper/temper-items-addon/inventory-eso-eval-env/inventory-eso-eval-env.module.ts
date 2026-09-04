import type { Module } from "@akasha/code-system/module"

export const inventoryEsoEvalEnv = {
  id: "01a06258-b52a-73ae-8e70-29b3bb5beb50",
  pageTypeSlug: "module",
  slug: "inventory-eso-eval-env",
  definition: "the evaluation environment the rule evaluator runs in, built from game state",
  code: "ts",
} as const satisfies Module
