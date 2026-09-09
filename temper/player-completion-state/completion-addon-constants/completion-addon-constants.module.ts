import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionAddonConstants = {
  id: "01a06253-d28f-7001-a366-62368ebea00f",
  pageTypeSlug: "module",
  slug: "completion-addon-constants",
  definition: "the completion addon's name, its version and the name its saved table is kept under",
  code: "ts",
} as const satisfies Module
