import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const badTruncate = {
  id: "01a06110-abe0-7b62-9199-0042cb97c12f",
  pageTypeSlug: "module",
  type: "module",
  slug: "bad-truncate",
  definition: "the truncation the game itself does, kept wrong on purpose so numbers match",
  code: "ts",
} as const satisfies Module
