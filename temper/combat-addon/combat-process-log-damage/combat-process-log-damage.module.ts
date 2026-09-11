import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const combatProcessLogDamage = {
  id: "01a0617f-584d-7663-afa4-463d09a34711",
  type: "module",
  slug: "combat-process-log-damage",
  definition: "reading damage and healing lines out of the recorded log",
  code: "ts",
} as const satisfies Module
