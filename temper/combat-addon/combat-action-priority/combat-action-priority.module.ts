import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const combatActionPriority = {
  id: "01a0617f-5833-730c-9a17-c9a43f533391",
  type: "module",
  slug: "combat-action-priority",
  definition: "ordering the effects of an action so the most trustworthy one is first",
  code: "ts",
} as const satisfies Module
