import type { Module } from "@akasha/code/module"

export const watcherImportTasks = {
  id: "01a06381-35cf-7769-9717-fa7f6b0898ae",
  pageTypeSlug: "module",
  slug: "watcher-import-tasks",
  definition: "a task capture read into completions marked on the tasks themselves",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A task is reached by the id the addon has and by the task's slug alike.",
    },
    {
      invariantKind: "departure",
      statement: "A completion whose instant is not above zero is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A task completed twice in one logical day is counted once.",
    },
    {
      invariantKind: "departure",
      statement: "A recurring task takes a rolled due date and keeps its page.",
    },
    {
      invariantKind: "departure",
      statement: "A task with no rule is marked done and keeps its page.",
    },
    {
      invariantKind: "departure",
      statement: "A cumulative task at its cap is marked done rather than rolled.",
    },
    {
      invariantKind: "departure",
      statement: "A task at its cumulative cap that no completion named is marked done at the end.",
    },
    {
      invariantKind: "departure",
      statement: "A task already marked done is marked done no second time.",
    },
    {
      invariantKind: "departure",
      statement: "A completion whose timestamp is zero clears the keys that completion set.",
    },
    {
      invariantKind: "departure",
      statement: "The keys a completion touches are read from the page type marked.",
    },
    {
      invariantKind: "absence",
      statement: "A completion is written nowhere but on the task the completion names.",
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
      invariantKind: "departure",
      statement:
        "A task is rolled by the account's characters' progress rather than by a whole-task completion.",
    },
    {
      invariantKind: "departure",
      statement: "A task due beyond today is not rolled.",
    },
    {
      invariantKind: "departure",
      statement: "A task stating no recurrence is not rolled.",
    },
    {
      invariantKind: "departure",
      statement: "A task already marked done is not rolled.",
    },
    {
      invariantKind: "departure",
      statement: "The roster a task is judged against is every character the account has.",
    },
    {
      invariantKind: "departure",
      statement: "A roll moves the due date alone.",
    },
    {
      invariantKind: "departure",
      statement: "A roll the store refuses skips that task rather than stopping the import.",
    },
    {
      invariantKind: "departure",
      statement: "A recomputation that fails is reported rather than stopping the import.",
    },
  ],
} as const satisfies Module
