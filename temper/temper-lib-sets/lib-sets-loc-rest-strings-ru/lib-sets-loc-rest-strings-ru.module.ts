import type { Module } from "@akasha/code-system/module"

export const libSetsLocRestStringsRu = {
  id: "01a061d7-7bc1-75a9-8b21-5c2e51a9a6fb",
  pageTypeSlug: "module",
  slug: "lib-sets-loc-rest-strings-ru",
  definition: "the library's own interface text in Russian",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Text absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
