import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const customMenuTypes = {
  id: "01a0605a-5821-7727-8604-cde8e6734264",
  pageTypeSlug: "module",
  type: "module",
  slug: "custom-menu-types",
  definition: "the shapes a custom menu's rows, entries and windows take",
  code: "ts",
} as const satisfies Module
