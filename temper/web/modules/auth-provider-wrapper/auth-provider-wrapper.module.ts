import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const authProviderWrapper = {
  id: "01a06432-b190-7bdd-9689-8a19b01cb487",
  type: "page-type/module",
  slug: "auth-provider-wrapper",
  definition: "the temper pages a signed-in reader's tree of components is given",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page store is told of the reader by the shared auth provider.",
    },
  ],
} as const satisfies Module
