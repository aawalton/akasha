import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherTaskProgressLanding = {
  id: "01a08258-933d-7198-bd62-1be9c3a4e475",
  type: "module",
  slug: "watcher-task-progress-landing",
  definition: "the recomputed progress of every task landed as one commit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file the recomputation moves lands in one write.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file already saying what the reading says is not written again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run moving no file writes nothing and commits nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The completion each character has is read from the file beside that character.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A character with no completion file beside it counts as having no completion.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A completion file holding no JSON object refuses the recomputation.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the completion file it read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that refuses leaves every progress file as it was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A character's line is labelled by that character's first name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task the pages placed no file for is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every reach outside this module is an argument the caller may hand in.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The account whose completion is read is the account the tasks name.",
    },
  ],
} as const satisfies Module
