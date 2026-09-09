import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillLineCategoryData = {
  id: "01a0608a-c135-7b53-b635-1e9c4d4ba002",
  pageTypeSlug: "module",
  slug: "skill-line-category-data",
  definition: "the ten groupings a skill line falls into, each with its display order",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill-line-category pages rather than by hand.",
    },
  ],
} as const satisfies Module
