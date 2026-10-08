import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useDestinationTypes = {
  id: "01a060d9-44ce-76b7-8295-b4cd3f803801",
  type: "page-type/module",
  slug: "use-destination-types",
  definition: "the identity of a character and the key of an item that can teach a character",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character id is a string held apart from every other string by a brand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item a character learns from is keyed by the kind of knowledge granted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A motif chapter of null names the master book covering every chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copy held in storage names no holder.",
    },
  ],
  createdAt: "2026-09-02T06:40:46.798Z",
  updatedAt: "2026-09-27T01:00:12.000Z",
} as const satisfies Module
