import type { Module } from "@akasha/code/module"

export const watcherTaskCapture = {
  id: "01a076f7-553a-76cf-a7a6-6c6dd69f52a9",
  pageTypeSlug: "module",
  slug: "watcher-task-capture",
  definition: "the task capture read into whole-task completions and per-character marks",
  code: "ts",
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
      statement:
        "A key with a colon at or after its thirty-seventh character is no whole-task completion.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming one character is carried out as a mark rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The keys left out are counted beside the completions captured.",
    },
    {
      invariantKind: "departure",
      statement: "A progress snapshot the game holds at zero is no progress.",
    },
    {
      invariantKind: "departure",
      statement: "A progress snapshot naming the whole task rather than one character is left out.",
    },
    {
      invariantKind: "absence",
      statement: "No Lua is run to read the capture.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
