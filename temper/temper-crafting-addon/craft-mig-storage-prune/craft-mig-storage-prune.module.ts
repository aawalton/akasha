import type { Module } from "@akasha/code-system/module"

export const craftMigStoragePrune = {
  id: "01a061c7-e85c-71a2-ac7b-864733adccf4",
  pageTypeSlug: "module",
  slug: "craft-mig-storage-prune",
  definition: "drops the empty storage entries an older version left",
  code: "ts",
} as const satisfies Module
