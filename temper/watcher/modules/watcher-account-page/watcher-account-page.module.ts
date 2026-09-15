import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherAccountPage = {
  id: "01a06381-35cf-7609-a436-3c4f4a0d6e3a",
  type: "module",
  slug: "watcher-account-page",
  definition: "the page for the game account a watcher import writes under, made where absent",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account page is found by its title rather than by its id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The title of an account page is the account name the game gave.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account page absent is made rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An upsert answering with no id is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names the account rather than the import that asked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the function that does the upsert.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads or writes anything else about an account.",
    },
  ],
} as const satisfies Module
