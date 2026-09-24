import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherAccountPage = {
  id: "01a06381-35cf-7609-a436-3c4f4a0d6e3a",
  type: "page-type/module",
  slug: "watcher-account-page",
  definition: "the page for the game account a watcher import writes under, made where absent",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account page is found by its key rather than by its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title of an account page is the account name the game gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account page absent is made rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An upsert answering with no id is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names the account rather than the import that asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the function that does the upsert.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes anything else about an account.",
    },
  ],
} as const satisfies Module
