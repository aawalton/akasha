import type { Module } from "@akasha/code-system/module"

export const libSetsCoreSetTypeQueries = {
  id: "01a061fc-ceec-7138-838e-448841d39974",
  pageTypeSlug: "module",
  slug: "lib-sets-core-set-type-queries",
  definition: "the sets of one type, and the drop mechanic names a set carries in each language",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The world map opener is published from this module rather than from navigation.",
    },
  ],
} as const satisfies Module
