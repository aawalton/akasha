import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const useCompanions = {
  id: "01a06360-7480-7003-a85c-d8871a560ac7",
  pageTypeSlug: "module",
  slug: "use-companions",
  definition: "a player's companion builds, read and written",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A companion build is owned by the user id its userId property holds.",
    },
    {
      invariantKind: "departure",
      statement: "Build metadata that does not parse reads as null.",
    },
    {
      invariantKind: "absence",
      statement: "A role the companions core does not name is dropped from the build.",
    },
  ],
} as const satisfies Module
