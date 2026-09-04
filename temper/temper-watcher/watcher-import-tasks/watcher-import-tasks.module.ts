import type { Module } from "@akasha/code-system/module"

export const watcherImportTasks = {
  id: "01a06381-35cf-7769-9717-fa7f6b0898ae",
  pageTypeSlug: "module",
  slug: "watcher-import-tasks",
  definition: "a task capture read into completed-day lines, rolled due dates and tasks taken away",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The task capture reaches this module as text rather than as a path.",
    },
    {
      invariantKind: "departure",
      statement: "A completion whose value is not a number is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A key carrying a colon at or after its thirty-seventh character is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A task is reached by the id the addon carries and by the task's slug alike.",
    },
    {
      invariantKind: "departure",
      statement: "A completion of a task carrying no slug or no title is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A completion whose instant is not above zero is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A completion the day already holds counts as imported rather than as a failure.",
    },
    {
      invariantKind: "departure",
      statement: "A recurring task completed twice in one logical day is counted once.",
    },
    {
      invariantKind: "departure",
      statement: "A recurring task takes a rolled due date and keeps its file.",
    },
    {
      invariantKind: "departure",
      statement: "A one-off task goes with the progress file beside that task.",
    },
    {
      invariantKind: "departure",
      statement: "A cumulative task at its cap goes rather than rolling.",
    },
    {
      invariantKind: "departure",
      statement: "A task at its cumulative cap that no completion named goes at the end.",
    },
    {
      invariantKind: "departure",
      statement: "A completion whose timestamp is zero clears the newest line naming the task.",
    },
    {
      invariantKind: "departure",
      statement: "The days are read newest first.",
    },
    {
      invariantKind: "departure",
      statement: "A day that goes unread clears nothing rather than refusing the whole import.",
    },
    {
      invariantKind: "departure",
      statement: "A task no completion resolves is reported and skipped.",
    },
    {
      invariantKind: "departure",
      statement: "Every reach outside this module is an argument the caller may hand in.",
    },
    {
      invariantKind: "departure",
      statement: "An argument the caller leaves out defaults to the real thing.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that refuses stops the import.",
    },
    {
      invariantKind: "departure",
      statement: "A clearing that refuses skips that task rather than stopping the import.",
    },
    {
      invariantKind: "absence",
      statement: "No Lua is run to read the capture.",
    },
  ],
} as const satisfies Module
