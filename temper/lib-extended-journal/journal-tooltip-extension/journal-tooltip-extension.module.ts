import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const journalTooltipExtension = {
  id: "01a0617d-5454-7c1c-8400-f6e1401fc317",
  type: "module",
  slug: "journal-tooltip-extension",
  definition: "the tooltip section another add-on writes its own lines into",
  code: "ts",
} as const satisfies Module
