import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useDestinationTypes = {
  id: "01a060d9-44ce-76b7-8295-b4cd3f803801",
  type: "module",
  slug: "use-destination-types",
  definition: "the identity of a character and the key of an item a character may learn from",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A character id is a string held apart from every other string by a brand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item a character learns from is keyed by the kind of knowledge granted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A motif chapter of null names the master book covering every chapter.",
    },
  ],
} as const satisfies Module
