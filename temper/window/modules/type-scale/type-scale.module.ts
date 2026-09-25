import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const typeScale = {
  id: "01a0d8ec-bf2c-7168-a84c-a0284fc3084e",
  type: "page-type/module",
  slug: "type-scale",
  definition: "the web's type scale, named as the fonts the game draws",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A size is one of the web's steps: 12, 14, 16, 18, 20, 24 and 30.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight is one of 400, 500, 600 and 700.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text is set in Geist, and a number in Geist Mono.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A font is named by the path the game reads it from inside the Temper add-on.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Geist Mono heavier than 500 is set at 500, the heaviest Temper ships.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No font here carries a shadow, as no text on the web does.",
    },
  ],
} as const satisfies Module
