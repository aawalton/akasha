import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherTaskProgressLanding = {
  id: "01a08258-933d-7198-bd62-1be9c3a4e475",
  type: "page-type/module",
  slug: "watcher-task-progress-landing",
  definition: "the recomputed progress of every task landed as one commit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file the recomputation moves lands in one write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file already saying what the reading says is not written again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run moving no file writes nothing and commits nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The completion each character has is read from the file beside that character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character with no completion file beside it counts as having no completion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A completion file holding no JSON object refuses the recomputation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the completion file it read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that refuses leaves every progress file as it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's line is labelled by that character's first name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task the pages placed no file for is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task states the character it falls to as its progress lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task falling to nobody states no character rather than the last one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reach outside this module is an argument the caller may hand in.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The account whose completion is read is the account the tasks name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A count a page sets by hand lifts a character's completion before the reading is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character no such page names is read as the game reported that character.",
    },
  ],
} as const satisfies Module
