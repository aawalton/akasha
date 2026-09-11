import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const targetSource = {
  id: "01a060ea-ac65-7ac7-b0dd-b67eab31272a",
  pageTypeSlug: "module",
  type: "module",
  slug: "target-source",
  definition: "the target a build is measured against, with its armor and its health set",
  code: "ts",
} as const satisfies Module
