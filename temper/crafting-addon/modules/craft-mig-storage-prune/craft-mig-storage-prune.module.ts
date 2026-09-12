import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const craftMigStoragePrune = {
  id: "01a061c7-e85c-71a2-ac7b-864733adccf4",
  type: "module",
  slug: "craft-mig-storage-prune",
  definition: "drops the empty storage entries an older version left",
  code: "ts",
} as const satisfies Module
