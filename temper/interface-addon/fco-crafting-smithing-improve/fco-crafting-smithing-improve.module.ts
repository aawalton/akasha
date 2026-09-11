import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const fcoCraftingSmithingImprove = {
  id: "01a06115-1ac7-7496-8d0d-86f1548469eb",
  pageTypeSlug: "module",
  slug: "fco-crafting-smithing-improve",
  definition: "the smithing improvement panel the interface tweaks change",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No shared guard is kept for the type each guard here narrows to.",
    },
  ],
} as const satisfies Module
