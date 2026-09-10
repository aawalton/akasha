import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCompanionProgress = {
  id: "01a06121-f0d1-7103-ba96-adbf20efcb3e",
  pageTypeSlug: "module",
  slug: "completion-companion-progress",
  definition: "each companion of a player counted for level, rapport, quests and skill lines",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A companion never met counts as nothing rather than being left out.",
    },
  ],
} as const satisfies Module
