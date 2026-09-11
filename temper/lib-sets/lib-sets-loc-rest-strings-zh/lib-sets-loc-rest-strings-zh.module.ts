import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const libSetsLocRestStringsZh = {
  id: "01a061d7-7bc2-7b7f-96ff-576e321497de",
  type: "module",
  slug: "lib-sets-loc-rest-strings-zh",
  definition: "the library's own interface text in Chinese",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Text absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
