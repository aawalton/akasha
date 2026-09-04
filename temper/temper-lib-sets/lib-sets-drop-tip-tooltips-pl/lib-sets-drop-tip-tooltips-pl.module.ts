import type { Module } from "@akasha/code-system/module"

export const libSetsDropTipTooltipsPl = {
  id: "01a061d6-3e3a-7aa9-962c-6609c9e2a0a4",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-tip-tooltips-pl",
  definition: "the Polish explanation of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An explanation absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
