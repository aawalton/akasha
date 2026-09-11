import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const extractTarget = {
  id: "01a06271-abcf-79be-9f97-349bee311cd5",
  type: "module",
  slug: "extract-target",
  definition: "the target a build is measured against, read out as an effect source",
  code: "ts",
} as const satisfies Module
