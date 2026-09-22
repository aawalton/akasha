import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ttcQualityTextClasses = {
  id: "01a060cf-b0b1-726e-9c87-8a0d3121e120",
  type: "page-type/module",
  slug: "ttc-quality-text-classes",
  definition: "a Tamriel Trade Centre item quality's text class",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A quality is keyed by the number Tamriel Trade Centre gives the quality.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No class here is named for the lowest quality.",
    },
  ],
} as const satisfies Module
