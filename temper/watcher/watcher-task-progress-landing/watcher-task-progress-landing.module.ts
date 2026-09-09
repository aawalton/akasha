import type { Module } from "@akasha/code/module"

export const watcherTaskProgressLanding = {
  id: "01a08258-933d-7198-bd62-1be9c3a4e475",
  pageTypeSlug: "module",
  slug: "watcher-task-progress-landing",
  definition: "the recomputed progress of every task landed as one commit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every file the recomputation moves lands in one write.",
    },
    {
      invariantKind: "departure",
      statement: "A file already saying what the reading says is not written again.",
    },
    {
      invariantKind: "departure",
      statement: "A run moving no file writes nothing and commits nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The completion each character has is read from the file beside that character.",
    },
    {
      invariantKind: "departure",
      statement: "A completion that will not parse reads as nothing rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "A character's line is labelled by that character's first name.",
    },
    {
      invariantKind: "departure",
      statement: "A task the pages placed no file for is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Every reach outside this module is an argument the caller may hand in.",
    },
    {
      invariantKind: "gap",
      statement: "The account whose completion is read is the account the tasks name.",
    },
  ],
} as const satisfies Module
