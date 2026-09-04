import type { Module } from "@akasha/code-system/module"

export const libSetsCoreCasts = {
  id: "01a061fc-cee9-75c5-a75c-0036c8d4c7a8",
  pageTypeSlug: "module",
  slug: "lib-sets-core-casts",
  definition: "the narrowings for the slots and set-keyed tables hung on the LibSets global",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The global's slots are reached by string key rather than by a declared field.",
    },
  ],
} as const satisfies Module
