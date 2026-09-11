import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const buffOrDebuffCalculator = {
  id: "01a06133-c630-7196-9b15-0494a9125cf0",
  type: "module",
  slug: "buff-or-debuff-calculator",
  definition: "the buffs and debuffs the effect sources of a character build put in play",
  code: "ts",
} as const satisfies Module
