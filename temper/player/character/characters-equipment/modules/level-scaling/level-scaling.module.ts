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
      statement: "A weapon's quality share comes from its quality page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon's worth level comes from the level band its item level falls in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon's band worth is rounded down, and an armor piece's to nearest.",
    },
  ],
  createdAt: "2026-09-02T09:24:55.954Z",
  updatedAt: "2026-10-20T17:36:52.256Z",
} as const satisfies Module
