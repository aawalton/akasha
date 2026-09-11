import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const cliLinkFailure = {
  id: "01a06432-b190-7ca6-aaac-0fa42ba80305",
  type: "module",
  slug: "cli-link-failure",
  definition: "the ways linking a command line tool fails, each written out for a reader",
  code: "ts",
  test: "ts",
} as const satisfies Module
