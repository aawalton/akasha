import type { Module } from "@akasha/code/module"

export const watcherTaskRolling = {
  id: "01a076f1-163b-7fda-ab45-6cd8d0a5e4a1",
  pageTypeSlug: "module",
  slug: "watcher-task-rolling",
  definition: "whether a task comes round again, judged from what each character did at it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A task of `next_character` scope rolls once the effective character has progressed at the task.",
    },
    {
      invariantKind: "departure",
      statement: "Only the effective character's progress rolls a `next_character` task.",
    },
    {
      invariantKind: "departure",
      statement: "A task of `next_character` scope naming no effective character does not roll.",
    },
    {
      invariantKind: "departure",
      statement:
        "An `all_characters` task rolls once every character on the roster has completed or progressed.",
    },
    {
      invariantKind: "departure",
      statement: "A character the game has no record for counts as not progressed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The roster is every character the account has rather than the characters lately played.",
    },
    {
      invariantKind: "departure",
      statement: "A task of another scope is not rolled by a character's own progress.",
    },
    {
      invariantKind: "departure",
      statement: "A roster holding nobody rolls nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A mark naming another task answers for the other task alone.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict has the reason the verdict was reached.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
