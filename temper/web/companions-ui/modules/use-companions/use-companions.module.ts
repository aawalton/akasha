import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCompanions = {
  id: "01a06360-7480-7003-a85c-d8871a560ac7",
  type: "page-type/module",
  slug: "use-companions",
  definition: "a player's companion builds, read and written",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion build belongs to the account its account page names.",
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
      statement: "A companion's progress page is found by the address of the companion's page.",
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
      statement: "A role the companions core does not name is dropped from the build.",
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
