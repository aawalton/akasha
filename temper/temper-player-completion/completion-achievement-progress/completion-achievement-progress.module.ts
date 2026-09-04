import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionAchievementProgress = {
  id: "01a06358-4f7c-710b-83bf-54c15075a3ce",
  pageTypeSlug: "module",
  slug: "completion-achievement-progress",
  definition:
    "the achievement points an account and each character have earned, counted by heading",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The achievement catalog arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "departure",
      statement: "A page's category tells the account tally apart from the character tally.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating a parent is a subcategory of the page the parent names.",
    },
    {
      invariantKind: "departure",
      statement: "Headings are ordered by display order.",
    },
    {
      invariantKind: "departure",
      statement: "A character heading merges into the account heading carrying the same title.",
    },
    {
      invariantKind: "departure",
      statement: "An achievement the store never recorded counts as no steps done.",
    },
    {
      invariantKind: "departure",
      statement: "A character achievement rolled into the account takes the roster's best steps.",
    },
    {
      invariantKind: "departure",
      statement: "The roster is an argument the caller may give as undefined.",
    },
  ],
} as const satisfies Module
