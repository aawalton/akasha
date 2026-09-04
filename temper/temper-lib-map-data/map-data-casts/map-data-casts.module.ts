import type { Module } from "@akasha/code-system/module"

export const mapDataCasts = {
  id: "01a061e1-ae9a-712e-bdb0-2073bf6201de",
  pageTypeSlug: "module",
  slug: "map-data-casts",
  definition: "what an untyped table the game hands over is taken to be",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
