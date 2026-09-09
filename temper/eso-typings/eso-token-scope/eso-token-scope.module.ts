import type { Module } from "@akasha/code/module"

export const esoTokenScope = {
  id: "01a0673e-3ddf-7002-9c1f-4402e2e05fcd",
  pageTypeSlug: "module",
  slug: "eso-token-scope",
  definition: "the tokens an opt-in list picks out of a dump, with what those tokens reach",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A function or an event the list does not name is left out.",
    },
    {
      invariantKind: "departure",
      statement: "An object the list names carries in the objects above.",
    },
    {
      invariantKind: "departure",
      statement: "An excluded object is left out however the object was reached.",
    },
    {
      invariantKind: "departure",
      statement: "An enum named in a taken signature is taken too.",
    },
    {
      invariantKind: "departure",
      statement: "A name the dump does not describe is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "The tokens taken keep the order the dump described.",
    },
  ],
} as const satisfies Module
