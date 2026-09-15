import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCardRegistry = {
  id: "01a06103-0619-70b6-a023-3ddab1c8dcb3",
  type: "module",
  slug: "completion-card-registry",
  definition: "every completion card with the tab and the title the category tree gives it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A card identifier is a literal type read off the category tree.",
    },
  ],
} as const satisfies Module
