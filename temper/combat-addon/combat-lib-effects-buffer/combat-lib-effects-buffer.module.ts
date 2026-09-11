import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const combatLibEffectsBuffer = {
  id: "01a0617f-5845-7db3-8f8a-2f2bdaef1201",
  pageTypeSlug: "module",
  type: "module",
  slug: "combat-lib-effects-buffer",
  definition: "holding effect changes until the fight they belong to is known",
  code: "ts",
} as const satisfies Module
