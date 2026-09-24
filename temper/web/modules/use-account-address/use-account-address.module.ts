import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useAccountAddress = {
  id: "01a0d432-ba07-790c-9d52-9b25d2599f63",
  type: "page-type/module",
  slug: "use-account-address",
  definition: "the address of the account page a signed-in user owns, read in a component",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "No user signed in answers no address and is not loading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A user whose account page is not yet read answers no address while loading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller holding no address filters on the value that matches nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write owned by an account whose address is not yet read is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build naming the viewer's own account page is owned by the viewer's user.",
    },
  ],
} as const satisfies Module
