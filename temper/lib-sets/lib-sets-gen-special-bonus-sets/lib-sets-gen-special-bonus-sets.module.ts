import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const libSetsGenSpecialBonusSets = {
  id: "01a061fc-cee7-751f-805d-2742902010bd",
  type: "module",
  slug: "lib-sets-gen-special-bonus-sets",
  definition: "the sets whose bonuses come at piece counts of their own",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is ported from the upstream library at a pinned commit.",
    },
  ],
} as const satisfies Module
