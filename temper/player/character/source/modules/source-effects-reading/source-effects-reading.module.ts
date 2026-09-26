import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sourceEffectsReading = {
  id: "01a0df59-89b4-7a82-a534-79cc5865c544",
  type: "page-type/module",
  slug: "source-effects-reading",
  definition: "the effects an effect source page lists, read as the effects a calculation sums",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry naming no stat, no effect type or no value is refused.",
    },
  ],
} as const satisfies Module
