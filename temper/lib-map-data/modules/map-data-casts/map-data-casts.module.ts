import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapDataCasts = {
  id: "01a061e1-ae9a-712e-bdb0-2073bf6201de",
  type: "page-type/module",
  slug: "map-data-casts",
  definition: "what an untyped table the game hands over is taken to be",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
