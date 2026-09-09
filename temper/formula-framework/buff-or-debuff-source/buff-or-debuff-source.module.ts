import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buffOrDebuffSource = {
  id: "01a06070-82dd-75fc-a816-ccfe176b1e07",
  pageTypeSlug: "module",
  slug: "buff-or-debuff-source",
  definition: "every buff and debuff the game names, gathered into one table",
  code: "ts",
} as const satisfies Module
