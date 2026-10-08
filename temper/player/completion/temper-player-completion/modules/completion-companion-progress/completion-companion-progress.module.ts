import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCompanionProgress = {
  id: "01a06121-f0d1-7103-ba96-adbf20efcb3e",
  type: "page-type/module",
  slug: "completion-companion-progress",
  definition: "each companion of a player counted for level, rapport, quests and skill lines",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion never met counts as nothing rather than being left out.",
    },
  ],
  createdAt: "2026-09-02T08:00:09.425Z",
  updatedAt: "2026-09-21T15:58:08.000Z",
} as const satisfies Module
