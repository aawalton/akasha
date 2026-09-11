import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const lcccCasts = {
  id: "01a08d72-b007-7beb-b91e-33727605794e",
  type: "module",
  slug: "lccc-casts",
  definition: "what a value the game hands over is taken to be",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
