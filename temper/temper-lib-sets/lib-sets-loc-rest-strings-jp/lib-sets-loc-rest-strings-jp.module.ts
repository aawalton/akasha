import type { Module } from "@akasha/code-system/module"

export const libSetsLocRestStringsJp = {
  id: "01a061d7-7bbe-7d2b-96f1-74bf43a65330",
  pageTypeSlug: "module",
  slug: "lib-sets-loc-rest-strings-jp",
  definition: "the library's own interface text in Japanese",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Japanese is not among the languages the library counts as supported.",
    },
  ],
} as const satisfies Module
