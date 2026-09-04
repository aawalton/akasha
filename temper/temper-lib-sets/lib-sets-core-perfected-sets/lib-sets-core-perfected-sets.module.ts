import type { Module } from "@akasha/code-system/module"

export const libSetsCorePerfectedSets = {
  id: "01a061fc-ceeb-71fc-bced-c9b4d1f3537a",
  pageTypeSlug: "module",
  slug: "lib-sets-core-perfected-sets",
  definition: "which set is the perfected twin of which, and the zone each of the pair drops in",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A pair is only recorded when both set ids and both zone ids are known.",
    },
  ],
} as const satisfies Module
