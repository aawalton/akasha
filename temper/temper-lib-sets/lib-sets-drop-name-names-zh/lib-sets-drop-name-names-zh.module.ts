import type { Module } from "@akasha/code-system/module"

export const libSetsDropNameNamesZh = {
  id: "01a061d6-3e2c-73a9-8d2e-a0f72c7e4c88",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-name-names-zh",
  definition: "the Chinese name of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
