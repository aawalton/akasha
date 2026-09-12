import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const craftDefined = {
  id: "01a08de1-2f29-7d20-a437-b66d1cb3ba33",
  type: "module",
  slug: "craft-defined",
  definition: "a value the crafting add-on read that must be there, refused where it is nil",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A value that is nil ends the call rather than being carried on.",
    },
  ],
} as const satisfies Module
