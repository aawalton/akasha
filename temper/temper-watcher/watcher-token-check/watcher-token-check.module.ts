import type { Module } from "@akasha/code-system/module"

export const watcherTokenCheck = {
  id: "01a0640f-8510-7490-bf5f-876df0d09100",
  pageTypeSlug: "module",
  slug: "watcher-token-check",
  definition: "the account a watcher token presented to the server represents",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token of the wrong shape is refused without the store being reached.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stored hash is compared in time that does not vary with how far the hash matches.",
    },
    {
      invariantKind: "departure",
      statement: "An enrolment naming no account grants nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An enrolment matched by its digest and granting nothing names the key it wanted.",
    },
    {
      invariantKind: "departure",
      statement: "A token that matches no enrolment is refused without a word.",
    },
    {
      invariantKind: "departure",
      statement: "A bookkeeping write that fails does not decide authentication.",
    },
  ],
} as const satisfies Module
