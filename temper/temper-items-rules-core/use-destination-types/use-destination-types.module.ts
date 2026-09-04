import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const useDestinationTypes = {
  id: "01a060d9-44ce-76b7-8295-b4cd3f803801",
  pageTypeSlug: "module",
  slug: "use-destination-types",
  definition: "the identity of a character and the key of an item a character may learn from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character id is a string held apart from every other string by a brand.",
    },
    {
      invariantKind: "departure",
      statement: "An item a character learns from is keyed by the kind of knowledge granted.",
    },
    {
      invariantKind: "departure",
      statement: "A motif chapter of null names the master book covering every chapter.",
    },
  ],
} as const satisfies Module
