import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherBuildChoosing = {
  id: "01a19924-e747-7b19-ba98-0752ead54896",
  type: "page-type/module",
  slug: "watcher-build-choosing",
  definition: "the build chosen in the game, written as the character's target build",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A choice names the build chosen and the target build it was chosen over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A choice made over a build that is no longer the target is left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A choice is written after the builds saved in the game have landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A choice of a build made in the game names the change that made the build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a target build of the character is chosen.",
    },
  ],
  createdAt: "2026-11-01T22:04:54.982Z",
  updatedAt: "2026-11-01T22:04:54.982Z",
} as const satisfies Module
