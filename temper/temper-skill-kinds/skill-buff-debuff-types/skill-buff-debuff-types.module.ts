import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillBuffDebuffTypes = {
  id: "01a060db-b2bc-77b3-a76e-2df74a3b29b8",
  pageTypeSlug: "module",
  slug: "skill-buff-debuff-types",
  definition: "the buffs and the debuffs a skill activation puts on, and the shape each carries",
  code: "ts",
} as const satisfies Module
