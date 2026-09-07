import type { Module } from "@akasha/code/module"

export const libSetsConstCasts = {
  id: "01a061d7-7bc6-7f09-8a94-7988ce547bf5",
  pageTypeSlug: "module",
  slug: "lib-sets-const-casts",
  definition: "an unchecked cast onto an array of DLC entries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The cast asserts the type rather than checking that type.",
    },
  ],
} as const satisfies Module
