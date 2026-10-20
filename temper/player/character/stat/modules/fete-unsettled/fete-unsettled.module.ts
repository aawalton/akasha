import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const feteUnsettled = {
  id: "01a159aa-bea4-7f4f-b4fc-70e6ada1d1cf",
  type: "page-type/module",
  slug: "fete-unsettled",
  definition: "whether a reading's stat may still trail an Escalating Fete change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's maximum stats can trail an Escalating Fete change past two captures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rule is stated on the stat-compare command, the one place it is decided.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeping no Fete change leaves every stat settled.",
    },
  ],
  createdAt: "2026-10-20T14:15:24.579Z",
  updatedAt: "2026-10-20T14:15:24.579Z",
} as const satisfies Module
