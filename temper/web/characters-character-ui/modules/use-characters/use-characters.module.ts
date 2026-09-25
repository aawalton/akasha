import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCharacters = {
  id: "01a06360-7480-7001-8431-aa4304c430ae",
  type: "page-type/module",
  slug: "use-characters",
  definition: "a player's character builds, read and written",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character build belongs to the account its account page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build names its account page by that page's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build made here is slugged by its name and the id it was made with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build written before the account page is read is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Build metadata is read off the keys the build page declares.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A role the character sources do not name is dropped from base roles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Making a new build, filing it and going to its page is one act here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build that could not be made leaves the act ready to be asked for again.",
    },
  ],
} as const satisfies Module
