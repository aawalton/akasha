import type { Module } from "@akasha/code-system/module"

export const libSetsDropNameNamesPl = {
  id: "01a061d6-3e2a-7620-9c5f-131d729f6153",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-name-names-pl",
  definition: "the Polish name of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
