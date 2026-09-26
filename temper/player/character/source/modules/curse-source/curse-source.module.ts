import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const curseSource = {
  id: "01a060ea-ac60-758d-ad8f-786d0b97c62d",
  type: "page-type/module",
  slug: "curse-source",
  definition: "the penalties a vampire stage puts on a character's recovery and costs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A vampire stage's penalties are the effects its temper-vampire-stage page lists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stage whose page lists no effect puts no curse source on a character.",
    },
  ],
} as const satisfies Module
