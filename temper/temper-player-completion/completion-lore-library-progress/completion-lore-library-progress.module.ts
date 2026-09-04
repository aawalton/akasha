import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionLoreLibraryProgress = {
  id: "01a06121-f0d4-76d5-a969-add5b8898bd8",
  pageTypeSlug: "module",
  slug: "completion-lore-library-progress",
  definition: "the shalidor books each character has read, counted by collection",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book is keyed by three indexes taken together.",
    },
  ],
} as const satisfies Module
