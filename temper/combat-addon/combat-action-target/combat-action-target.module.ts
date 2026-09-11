import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const combatActionTarget = {
  id: "01a0617f-5837-740f-b123-ade38e374182",
  type: "module",
  slug: "combat-action-target",
  definition: "what changes on the action list when the reticle moves to another target",
  code: "ts",
} as const satisfies Module
