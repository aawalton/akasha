import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const activityCategoryMapping = {
  id: "01a0630d-a106-7da5-b99e-785c3f6f6bfe",
  type: "page-type/module",
  slug: "activity-category-mapping",
  definition: "the activity an achievement's name adds to the activity of its heading",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The activity of an achievement, set or collectible heading is the link on that heading's page.",
    },
  ],
} as const satisfies Module
