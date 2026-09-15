import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsDataCasts = {
  id: "01a061d7-7bcb-7e37-92dc-722706d00752",
  type: "page-type/module",
  slug: "lib-sets-data-casts",
  definition: "unchecked casts onto the shapes of the preloaded set tables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each cast asserts a shape rather than checking a shape.",
    },
  ],
} as const satisfies Module
