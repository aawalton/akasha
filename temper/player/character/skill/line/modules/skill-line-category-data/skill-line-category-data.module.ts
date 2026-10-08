import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillLineCategoryData = {
  id: "01a0608a-c135-7b53-b635-1e9c4d4ba002",
  type: "page-type/module",
  slug: "skill-line-category-data",
  definition: "the ten groupings a skill line falls into, each with its display order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "It holds no category names; a screen reads them from the category pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the skill-line-category pages rather than by hand.",
    },
  ],
  createdAt: "2026-09-02T05:15:01.301Z",
  updatedAt: "2026-09-27T11:58:08.000Z",
} as const satisfies Module
