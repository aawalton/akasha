import type { Module } from "@akasha/code-system/module"

export const libSetsDropNameNamesJp = {
  id: "01a061d6-3e29-71a2-9796-db0823650883",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-name-names-jp",
  definition: "the Japanese name of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Japanese is not among the languages the library counts as supported.",
    },
  ],
} as const satisfies Module
