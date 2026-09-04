import type { Module } from "@akasha/code-system/module"

export const libSetsDropTipTooltipsJp = {
  id: "01a061d6-3e38-7495-9f75-d1317b5a4080",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-tip-tooltips-jp",
  definition: "the Japanese explanation of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Japanese is not among the languages the library counts as supported.",
    },
  ],
} as const satisfies Module
