import type { Module } from "@akasha/code-system/module"

export const watcherErrorEmissions = {
  id: "01a06365-5d76-75c1-a0a0-106da27f95b1",
  pageTypeSlug: "module",
  slug: "watcher-error-emissions",
  definition: "which of the game's Lua errors the watcher carries up and which it holds back",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An error is known by the crash signature of its message and its traceback.",
    },
    {
      invariantKind: "departure",
      statement: "An error never seen before is carried up.",
    },
    {
      invariantKind: "departure",
      statement: "An error seen before is carried up only when its count has risen.",
    },
    {
      invariantKind: "departure",
      statement: "An error whose count has not risen is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "An error the game had already unloaded is held back rather than carried up.",
    },
    {
      invariantKind: "departure",
      statement: "An error held back is counted as suppressed.",
    },
    {
      invariantKind: "departure",
      statement: "A count is recorded for every error read.",
    },
    {
      invariantKind: "departure",
      statement: "An error held back has its count recorded all the same.",
    },
    {
      invariantKind: "departure",
      statement: "The highest count read for one signature is the count recorded.",
    },
    {
      invariantKind: "departure",
      statement: "A time the game gave in seconds is carried up in milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "A missing traceback is carried up as an empty string.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sends anything anywhere.",
    },
  ],
} as const satisfies Module
