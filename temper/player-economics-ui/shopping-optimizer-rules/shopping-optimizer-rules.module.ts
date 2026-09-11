import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const shoppingOptimizerRules = {
  id: "01a063a1-8cc1-7008-8ec8-f577e7b9fa25",
  type: "module",
  slug: "shopping-optimizer-rules",
  definition: "a shopping route recomputed as its places are pinned",
  code: "ts",
} as const satisfies Module
