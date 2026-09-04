import type { Module } from "@akasha/code-system/module"

export const watcherSettingsNormalize = {
  id: "01a06367-c4f5-75c7-bf34-7f05e44866aa",
  pageTypeSlug: "module",
  slug: "watcher-settings-normalize",
  definition: "how the logging and safety settings the game wrote are read into known values",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value that is no record is answered with the defaults.",
    },
    {
      invariantKind: "departure",
      statement: "Action reports default to verbose.",
    },
    {
      invariantKind: "departure",
      statement: "Performance tracing is off unless the game asked for it.",
    },
    {
      invariantKind: "departure",
      statement: "A level the game wrote that is no known level falls back to the default.",
    },
    {
      invariantKind: "departure",
      statement: "Confirmation is asked for every destructive action by default.",
    },
    {
      invariantKind: "departure",
      statement: "A confirmation list that is no array is answered with the defaults.",
    },
    {
      invariantKind: "departure",
      statement: "An action named in the list that no longer exists is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "An empty confirmation list is kept rather than read as unset.",
    },
    {
      invariantKind: "departure",
      statement: "Open cooldown protection is on unless the game wrote that setting false.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
