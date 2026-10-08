import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const knownFilter = {
  id: "01a06100-3bf1-7c10-962d-c2163a907de5",
  type: "page-type/module",
  slug: "known-filter",
  definition: "the `known` condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `known` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A category outside the three roots named in the code is offered no `known` condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter is shown under its condition field page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter's options are its condition field's value pages.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.433Z",
  updatedAt: "2026-09-27T10:44:09.000Z",
} as const satisfies Module
