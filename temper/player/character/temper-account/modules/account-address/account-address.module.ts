import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountAddress = {
  id: "01a0d429-47a8-7060-8ba6-1e2dc523c0f6",
  type: "page-type/module",
  slug: "account-address",
  definition:
    "the address of the account page a signed-in user owns, and the user an address names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A temper page names its account by the address of that account's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account page is found from a user by its key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A user with no account page is refused, and the refusal names the user.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may ask instead and be answered no address for that user.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address that names no account page is refused rather than read as a user.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer read through the store is kept for the life of the process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the read, and an answer through it is never kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page one account holds of a thing every account may hold is named by the thing and the account.",
    },
  ],
} as const satisfies Module
