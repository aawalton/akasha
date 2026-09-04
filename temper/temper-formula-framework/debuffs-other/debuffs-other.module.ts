import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const debuffsOther = {
  id: "01a06070-82df-7a07-a3b0-d3dc1108475c",
  pageTypeSlug: "module",
  slug: "debuffs-other",
  definition: "the debuffs the game applies under neither Major nor Minor",
  code: "ts",
} as const satisfies Module
