import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoTokenScope = {
  id: "01a0673e-3ddf-7002-9c1f-4402e2e05fcd",
  type: "module",
  slug: "eso-token-scope",
  definition: "the tokens an opt-in list picks out of a dump, with what those tokens reach",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A function or an event the list does not name is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An object the list names carries in the objects above.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An excluded object is left out however the object was reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An enum named in a taken signature is taken too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the dump does not describe is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tokens taken keep the order the dump described.",
    },
  ],
} as const satisfies Module
