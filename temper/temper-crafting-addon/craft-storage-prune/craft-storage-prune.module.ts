import type { Module } from "@akasha/code-system/module"

export const craftStoragePrune = {
  id: "01a061c7-e870-76f8-9e9e-166fcff4ff1d",
  pageTypeSlug: "module",
  slug: "craft-storage-prune",
  definition: "drops the storage entries that count nothing",
  code: "ts",
} as const satisfies Module
