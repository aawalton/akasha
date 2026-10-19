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
      statement: "The answers are read from the engine answer catalog's table, handed in whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture holding no answers is read as nothing rather than as an empty table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No capture handed in is read as nothing.",
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
  createdAt: "2026-09-24T16:09:14.995Z",
  updatedAt: "2026-10-19T17:44:58.868Z",
} as const satisfies Module
