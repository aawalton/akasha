import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const potionState = {
  id: "01a061c7-e88a-7f71-b4bb-cb95b4102781",
  type: "module",
  slug: "potion-state",
  definition: "the one table the potion window reads and writes",
  code: "ts",
} as const satisfies Module
