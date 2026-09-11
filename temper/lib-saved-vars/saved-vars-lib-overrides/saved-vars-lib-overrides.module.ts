import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const savedVarsLibOverrides = {
  id: "01a06177-ac00-7df0-a521-47131bbd3ec6",
  pageTypeSlug: "module",
  type: "module",
  slug: "saved-vars-lib-overrides",
  definition:
    "the game's own saved variable constructors, wrapped to record what each constructor made",
  code: "ts",
} as const satisfies Module
