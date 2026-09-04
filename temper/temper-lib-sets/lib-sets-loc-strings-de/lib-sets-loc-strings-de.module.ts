import type { Module } from "@akasha/code-system/module"

export const libSetsLocStringsDe = {
  id: "01a061d7-7bb8-7159-ae33-38d189790073",
  pageTypeSlug: "module",
  slug: "lib-sets-loc-strings-de",
  definition: "the library's own interface text in German",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Text absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
