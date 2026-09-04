import type { Module } from "@akasha/code-system/module"

export const libSetsDropTipTooltipsEs = {
  id: "01a061d6-3e34-7669-8237-3aba71031bad",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-tip-tooltips-es",
  definition: "the Spanish explanation of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An explanation absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
