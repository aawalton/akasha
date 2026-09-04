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
      statement: "A completion travels as the file beside its page rather than as a page property.",
    },
    {
      invariantKind: "departure",
      statement: "A completion file holds the merged completion as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "The path a completion file takes is derived from the path the pages answered.",
    },
    {
      invariantKind: "departure",
      statement: "A page beside no completion file carries no stored completion.",
    },
    {
      invariantKind: "departure",
      statement: "A completion file holding no JSON object is refused rather than merged from.",
    },
    {
      invariantKind: "departure",
      statement: "A completion equal to what its file holds lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A page beside a completion file this import made is told that file's ending.",
    },
    {
      invariantKind: "departure",
      statement: "Every completion file of one page type is read in one read.",
    },
    {
      invariantKind: "departure",
      statement: "Every completion file of one page type lands in one write.",
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
      statement: "A caller may hand in what answers a page's path.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what reads the files beside pages.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what writes the files beside pages.",
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
    {
      invariantKind: "absence",
      statement: "No completion body reaches the set an upsert carries.",
    },
    {
      invariantKind: "absence",
      statement: "No folder holding a page is named here.",
    },
  ],
} as const satisfies Module
