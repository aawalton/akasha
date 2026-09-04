import type { Module } from "@akasha/code-system/module"

export const libSetsDataCasts = {
  id: "01a061d7-7bcb-7e37-92dc-722706d00752",
  pageTypeSlug: "module",
  slug: "lib-sets-data-casts",
  definition: "unchecked casts onto the shapes of the preloaded set tables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each cast asserts a shape rather than checking one.",
    },
  ],
} as const satisfies Module
