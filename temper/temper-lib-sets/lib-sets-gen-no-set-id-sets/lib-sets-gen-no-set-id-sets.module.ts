import type { Module } from "@akasha/code-system/module"

export const libSetsGenNoSetIdSets = {
  id: "01a061d7-7bcd-7e34-9bc0-f2daafdd16c4",
  pageTypeSlug: "module",
  slug: "lib-sets-gen-no-set-id-sets",
  definition: "the sets the game names without giving a set id",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is ported from the upstream library at a pinned commit.",
    },
    {
      invariantKind: "absence",
      statement: "The table is empty at the pinned commit.",
    },
  ],
} as const satisfies Module
