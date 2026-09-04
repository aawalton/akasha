import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const bulkUpdateJewelry = {
  id: "01a0616f-8e1b-7ecd-92b8-4681a7519f6f",
  pageTypeSlug: "module",
  slug: "bulk-update-jewelry",
  definition: "every jewelry slot given the same gear set or the same quality at once",
  code: "ts",
} as const satisfies Module
