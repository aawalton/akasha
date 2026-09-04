import type { Module } from "@akasha/code-system/module"

export const libSetsConstSettypes = {
  id: "01a061d6-3e21-7c23-b9d0-2f45a894170f",
  pageTypeSlug: "module",
  slug: "lib-sets-const-settypes",
  definition: "the fifteen kinds a gear set can be, numbered and named in eight languages",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each set type name is declared as a game global rather than a member of a table.",
    },
  ],
} as const satisfies Module
