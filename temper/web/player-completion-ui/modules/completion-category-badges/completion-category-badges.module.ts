import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCategoryBadges = {
  id: "01a0e2cd-f697-74ce-9ed9-4c2a21c19258",
  type: "page-type/module",
  slug: "completion-category-badges",
  definition: "a completion row's label drawn with a badge for each activity category",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A badge names its category as the category page's title does.",
    },
  ],
  createdAt: "2026-09-27T12:19:03.959Z",
  updatedAt: "2026-09-27T12:19:11.000Z",
} as const satisfies Module
