import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sourceEffectsReading = {
  id: "01a0df59-89b4-7a82-a534-79cc5865c544",
  type: "page-type/module",
  slug: "source-effects-reading",
  definition: "the effects an effect source page lists, read as the effects a calculation sums",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry naming no stat, no effect type or no value is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry naming an effect type the effect union lacks is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect entry naming a stat tree node is read as the stat that node is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect entry stating seconds is read as its value over those seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect entry naming buffs holds only while one of those buffs is up.",
    },
  ],
  createdAt: "2026-09-26T20:13:02.260Z",
  updatedAt: "2026-10-20T16:57:57.303Z",
} as const satisfies Module
