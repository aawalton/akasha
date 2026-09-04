import type { Module } from "@akasha/code-system/module"

export const libSetsLocOnOffLabels = {
  id: "01a061d7-7bb7-7e19-ab98-7217b31320b1",
  pageTypeSlug: "module",
  slug: "lib-sets-loc-on-off-labels",
  definition: "the game's own ON and OFF words, upper-cased",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The keys are the booleans spelled as text rather than booleans.",
    },
  ],
} as const satisfies Module
