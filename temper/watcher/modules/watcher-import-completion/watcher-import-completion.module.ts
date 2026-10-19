import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherImportCompletion = {
  id: "01a06381-35cf-7b6a-8ea9-a0064dcecdc0",
  type: "page-type/module",
  slug: "watcher-import-completion",
  definition:
    "a saved-variables file's completion merged forward onto the account, character and companion pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Stored completion is merged forward rather than replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A completion travels as the file beside its page rather than as a page property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Saved variables with no known section are refused rather than read as an empty account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account with no completion still has its page written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character or companion page names its account by the account page's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion page is found by the address of the companion's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion page takes the companion's id as its slug and its name as its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's order is written only where that character's page has no order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character page takes the race and class its capture names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The signed-in user is asked of the caller rather than of a session here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the read of pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the write of pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the answering of a page's path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the read of the files beside pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the write of the files beside pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in what logs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the naming of a companion from its def-id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the naming of a race and a class from their game ids.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every character in the file is written before any companion is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens the saved-variables file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads lua.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No completion body reaches the set an upsert has.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No folder with a page is named here.",
    },
  ],
  createdAt: "2026-09-02T19:03:27.439Z",
  updatedAt: "2026-10-19T23:31:52.865Z",
} as const satisfies Module
