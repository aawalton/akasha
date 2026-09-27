import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const levelScaling = {
  id: "01a0616f-8e12-73ab-b65c-c41fefc0e804",
  type: "page-type/module",
  slug: "level-scaling",
  definition: "what a piece of gear is worth at a level, before its trait and its glyph",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece's slope and intercept come from its weight or weapon type page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece's quality share comes from its quality page.",
    },
  ],
} as const satisfies Module
