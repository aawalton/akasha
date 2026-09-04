import type { Module } from "@akasha/code-system/module"

export const libSetsDropNameNamesRu = {
  id: "01a061d6-3e2b-7bbe-ae58-63f588a6807a",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-name-names-ru",
  definition: "the Russian name of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
