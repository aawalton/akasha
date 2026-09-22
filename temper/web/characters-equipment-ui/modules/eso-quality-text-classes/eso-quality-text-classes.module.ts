import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoQualityTextClasses = {
  id: "01a06333-1bcc-7c92-9074-8986a87d036f",
  type: "page-type/module",
  slug: "eso-quality-text-classes",
  definition: "an in-game item quality's text class",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A quality is keyed by the number the game gives the quality.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No class here is named for the lowest quality.",
    },
  ],
} as const satisfies Module
