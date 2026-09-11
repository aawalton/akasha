import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const writMarkSafeTabFilter = {
  id: "01a061c7-e8a3-7827-af25-b6195a11d6d0",
  pageTypeSlug: "module",
  type: "module",
  slug: "writ-mark-safe-tab-filter",
  definition: "reads the inventory tab's filter without failing when it is absent",
  code: "ts",
} as const satisfies Module
