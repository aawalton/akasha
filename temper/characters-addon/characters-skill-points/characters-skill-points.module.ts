import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersSkillPoints = {
  id: "01a062ea-606e-7faf-b765-76ed6f590faa",
  pageTypeSlug: "module",
  slug: "characters-skill-points",
  definition: "the skill points the character now played has earned, counted by source",
  code: "ts",
} as const satisfies Module
