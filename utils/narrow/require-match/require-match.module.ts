import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const requireMatch = {
  id: "01a05c94-2c02-7ce2-a9f5-31b565b1f8da",
  type: "module",
  slug: "require-match",
  definition: "the named groups a pattern takes from text, refused where it does not match",
  code: "ts",
} as const satisfies Module
