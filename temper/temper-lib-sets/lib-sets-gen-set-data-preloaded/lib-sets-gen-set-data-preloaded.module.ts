import type { Module } from "@akasha/code-system/module"

export const libSetsGenSetDataPreloaded = {
  id: "01a061dd-1562-75b4-97b2-c821be9c1a17",
  pageTypeSlug: "module",
  slug: "lib-sets-gen-set-data-preloaded",
  definition:
    "The whole LibSets SET_DATA_PRELOADED record gathered from the parts of its thirteen keys.",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "Each key spreads its parts in source order so every array valued key keeps its order.",
    },
    {
      invariantKind: "gap",
      statement:
        "Nothing checks that the parts of a key stay in source order once a part is moved.",
    },
  ],
  code: "ts",
} as const satisfies Module
