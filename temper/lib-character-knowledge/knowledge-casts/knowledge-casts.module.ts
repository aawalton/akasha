import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const knowledgeCasts = {
  id: "01a061fa-8003-7294-ab90-2fa2f73b33f0",
  type: "module",
  slug: "knowledge-casts",
  definition: "what an untyped table the game hands over is taken to be",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
