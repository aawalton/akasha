import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const debuffsMinor = {
  id: "01a06070-82df-7b02-a5c8-91030a6feea5",
  type: "page-type/module",
  slug: "debuffs-minor",
  definition: "the Minor debuffs the game applies",
  code: "ts",
} as const satisfies Module
