import type { Module } from "@akasha/code-system/module"

export const libSetsConstAllClassdata = {
  id: "01a061d7-7bc9-7ba9-94c0-a91d978b1f8a",
  pageTypeSlug: "module",
  slug: "lib-sets-const-all-classdata",
  definition: "every player class the game knows, with its index, name, icon and color",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The class list is read from the game at load rather than written out here.",
    },
  ],
} as const satisfies Module
