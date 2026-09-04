import type { Module } from "@akasha/code-system/module"

export const watcherImportCompletion = {
  id: "01a06381-35cf-7b6a-8ea9-a0064dcecdc0",
  pageTypeSlug: "module",
  slug: "watcher-import-completion",
  definition:
    "a saved-variables file's completion merged forward onto the account, character and companion pages",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Stored completion is merged forward rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement: "A merge that held a field back names that field in the log.",
    },
    {
      invariantKind: "departure",
      statement: "A completion reaches a page as JSON text rather than as a record.",
    },
    {
      invariantKind: "departure",
      statement:
        "Saved variables carrying no known section are refused rather than read as an empty account.",
    },
    {
      invariantKind: "departure",
      statement: "An account carrying no completion still has its page written.",
    },
    {
      invariantKind: "departure",
      statement:
        "A character's order is written only where that character's page carries no order.",
    },
    {
      invariantKind: "departure",
      statement: "The signed-in user is asked of the caller rather than of a session here.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what reads pages.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what writes pages.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what logs.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what names a companion from its def-id.",
    },
    {
      invariantKind: "departure",
      statement: "Every character in the file is written before any companion is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens the saved-variables file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads lua.",
    },
  ],
} as const satisfies Module
