import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCharacters = {
  id: "01a06360-7480-7001-8431-aa4304c430ae",
  type: "module",
  slug: "use-characters",
  definition: "a player's character builds, read and written",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A character build belongs to the account its account page names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Build metadata that does not parse reads as null.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A role the character sources do not name is dropped from base roles.",
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
