import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionAchievementProgress = {
  id: "01a06358-4f7c-710b-83bf-54c15075a3ce",
  type: "module",
  slug: "completion-achievement-progress",
  definition:
    "the achievement points an account and each character have earned, counted by heading",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The achievement catalog arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's category tells the account tally apart from the character tally.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating a parent is a subcategory of the page the parent names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Headings are ordered by display order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A character heading merges into the account heading with the same title.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An achievement the store never recorded counts as no steps done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A character achievement rolled into the account takes the roster's best steps.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The roster is an argument the caller may give as undefined.",
    },
  ],
} as const satisfies Module
