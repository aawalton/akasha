import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buffOrDebuffId = {
  id: "01a0614a-4ce5-7613-983f-ed59da792009",
  pageTypeSlug: "module",
  slug: "buff-or-debuff-id",
  definition: "the id an effect carries, whether the effect grants a buff or lays a debuff",
  code: "ts",
} as const satisfies Module
