import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const baseSource = {
  id: "01a060ea-ac5f-7d7c-b61a-f068bca19da7",
  type: "page-type/module",
  slug: "base-source",
  definition: "the stats every character has before race, class or gear says anything",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each base stat is read from its own temper-base-stat page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The source is named by the base source category page's title.",
    },
  ],
} as const satisfies Module
