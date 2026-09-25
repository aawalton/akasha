import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const activityCategories = {
  id: "01a06108-2fe7-758c-947c-5275babdadb5",
  type: "page-type/module",
  slug: "activity-categories",
  definition: "the kinds of thing there is to do in The Elder Scrolls Online",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The categories are built from the activity-category pages the bundler's glob finds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The categories are in the order of their slugs.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Where a category falls is the order the identifiers are read in.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "No type is read out of a glob, so the identifiers are spelled out as a type here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The test holds the identifiers spelled out here to the pages' keys.",
    },
  ],
} as const satisfies Module
