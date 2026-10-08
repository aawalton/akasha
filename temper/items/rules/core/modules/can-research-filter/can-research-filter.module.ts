import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const canResearchFilter = {
  id: "01a06100-3be7-745e-96c2-26bc05aa5740",
  type: "page-type/module",
  slug: "can-research-filter",
  definition: "the Can Research condition a rule may have, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `canResearch` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter is shown under its condition field page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter's options are its condition field's value pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category outside `equipment` is offered no Can Research condition.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.423Z",
  updatedAt: "2026-09-27T10:48:37.000Z",
} as const satisfies Module
