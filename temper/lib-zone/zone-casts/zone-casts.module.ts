import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const zoneCasts = {
  id: "01a061e7-92f2-790e-b9b3-5b0d9a77cf73",
  type: "module",
  slug: "zone-casts",
  definition: "what an untyped table the game hands over is taken to be",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
    {
      invariantKind: "departure",
      statement:
        "The slash-command library is reached off the global table rather than by its name.",
    },
  ],
} as const satisfies Module
