import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherTaskLanding = {
  id: "01a06381-35cf-7c4d-b5f1-4ad42ef2b4cc",
  type: "module",
  slug: "watcher-task-landing",
  definition: "a temper task's whole body written back with the keys a completion changes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The store takes a path and a whole body rather than the keys a page has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the body already has is restated in place.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the body has nowhere is added on the line before the closing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key told null is taken off the body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a key indented by two spaces is matched.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A key that is no bare name refuses the call before any body is composed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every key is judged before the first one is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body with no closing line is refused rather than guessed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body nothing would move on counts as landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body the store has nothing for is refused rather than made.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No task is ever taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each attempt reads the task afresh.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The caller states the commit message.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides the keys a completion changes on a task.",
    },
  ],
} as const satisfies Module
