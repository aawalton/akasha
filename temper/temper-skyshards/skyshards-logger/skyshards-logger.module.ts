import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skyshardsLogger = {
  id: "01a061a8-9c65-7814-aeb6-4e3c68e251d7",
  pageTypeSlug: "module",
  slug: "skyshards-logger",
  definition: "where the add-on writes its debug lines, and whether it writes them at all",
  code: "ts",
} as const satisfies Module
