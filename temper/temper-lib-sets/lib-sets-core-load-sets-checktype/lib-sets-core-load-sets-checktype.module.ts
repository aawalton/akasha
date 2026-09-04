import type { Module } from "@akasha/code-system/module"

export const libSetsCoreLoadSetsChecktype = {
  id: "01a061fc-ceec-7e93-b553-13609258078f",
  pageTypeSlug: "module",
  slug: "lib-sets-core-load-sets-checktype",
  definition: "sorting each set into its type table and filing where it drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A set whose items no longer exist is erased from every preloaded table holding that set.",
    },
    {
      invariantKind: "departure",
      statement:
        "Perfected and non-perfected pairs are learned from the game rather than from the data.",
    },
  ],
} as const satisfies Module
