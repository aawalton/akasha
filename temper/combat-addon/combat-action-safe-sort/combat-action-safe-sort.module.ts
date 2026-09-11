import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const combatActionSafeSort = {
  id: "01a0617f-5835-79b1-9d4b-055b608fc583",
  type: "module",
  slug: "combat-action-safe-sort",
  definition: "sorting a list with holes in it without the game raising an error",
  code: "ts",
} as const satisfies Module
