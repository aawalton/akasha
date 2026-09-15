import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCompanions = {
  id: "01a06360-7480-7003-a85c-d8871a560ac7",
  type: "module",
  slug: "use-companions",
  definition: "a player's companion builds, read and written",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A companion build belongs to the account its account page names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Build metadata is read off the keys the build page declares.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A role the companions core does not name is dropped from the build.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Making a new build, filing it and going to its page is one act here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build that could not be made leaves the act ready to be asked for again.",
    },
  ],
} as const satisfies Module
