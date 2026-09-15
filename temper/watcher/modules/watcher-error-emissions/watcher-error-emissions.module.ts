import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherErrorEmissions = {
  id: "01a06365-5d76-75c1-a0a0-106da27f95b1",
  type: "module",
  slug: "watcher-error-emissions",
  definition: "which of the game's Lua errors the watcher carries up and which it holds back",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error is known by the crash signature of its message and its traceback.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error never seen before is carried up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error seen before is carried up only when its count has risen.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error whose count has not risen is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error the game had already unloaded is held back rather than carried up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error held back is counted as suppressed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count is recorded for every error read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error held back has its count recorded all the same.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The highest count read for one signature is the count recorded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A time the game gave in seconds is carried up in milliseconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A missing traceback is carried up as an empty string.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here sends anything anywhere.",
    },
  ],
} as const satisfies Module
