import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineAnswersReading = {
  id: "01a0d42d-9ff3-7756-b11d-02fa4b069ba0",
  type: "page-type/module",
  slug: "engine-answers-reading",
  definition: "the reading taking the game's answers to its functions out of a capture",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The answers are read from the first account holding them, by sorted name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture holding no answers is read as nothing rather than as an empty table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that will not parse is read as nothing rather than raising.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function's answers are read in order up to the first that is missing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture from before functions were asked with values reads as none asked so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are sorted here, so what is written turns only where the game did.",
    },
  ],
} as const satisfies Module
