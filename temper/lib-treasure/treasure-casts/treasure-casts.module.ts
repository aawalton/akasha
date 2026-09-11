import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const treasureCasts = {
  id: "01a061d5-d0b3-779c-a12e-41bcbf143e5d",
  type: "module",
  slug: "treasure-casts",
  definition: "what an untyped table the game hands over is taken to be",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
