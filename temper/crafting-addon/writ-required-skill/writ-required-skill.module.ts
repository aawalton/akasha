import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const writRequiredSkill = {
  id: "01a061c7-e8af-74aa-84f5-c3d4f0fe6aaf",
  pageTypeSlug: "module",
  type: "module",
  slug: "writ-required-skill",
  definition: "the skills a character needs before a writ can be crafted",
  code: "ts",
} as const satisfies Module
