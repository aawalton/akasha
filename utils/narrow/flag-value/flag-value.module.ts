import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const flagValue = {
  id: "01a08dec-d271-7b61-b2b1-14f372b213b4",
  pageTypeSlug: "module",
  slug: "flag-value",
  definition: "the word a named flag is followed by on a command line, or nothing",
  code: "ts",
  test: "ts",
} as const satisfies Module
