import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const chunk = {
  id: "01a08dda-ba3d-7ad9-8463-064810882acb",
  type: "module",
  slug: "chunk",
  definition: "a list given back as runs of at most a stated size, in the order given",
  code: "ts",
} as const satisfies Module
