import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatActionRefine = {
  id: "01a0617f-5834-710d-b595-a8edf56ff070",
  type: "page-type/module",
  slug: "combat-action-refine",
  definition: "the tick that re-reads every tracked action and drops the finished ones",
  code: "ts",
} as const satisfies Module
