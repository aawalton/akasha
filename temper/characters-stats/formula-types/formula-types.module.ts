import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const formulaTypes = {
  id: "01a0612f-aae8-7aa2-b1ff-83a3ea1735e3",
  type: "module",
  slug: "formula-types",
  definition:
    "the formula nodes a character stat is computed from, over effect sources and other stats",
  code: "ts",
} as const satisfies Module
