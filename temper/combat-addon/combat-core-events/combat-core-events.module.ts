import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const combatCoreEvents = {
  id: "01a0617f-5840-7108-9e7d-9687243fbf11",
  pageTypeSlug: "module",
  type: "module",
  slug: "combat-core-events",
  definition: "the running fight's data and the chat lines the combat log is written as",
  code: "ts",
} as const satisfies Module
