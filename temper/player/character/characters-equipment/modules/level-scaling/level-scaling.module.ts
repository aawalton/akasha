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
      statement: "A piece's worth level is 0 at level 1, its level to 5, and one above it from 6.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece's worth level at a CP level is its CP band's, rounded to nearest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Armor and weapons share one worth level.",
    },
  ],
  createdAt: "2026-09-02T09:24:55.954Z",
  updatedAt: "2026-10-20T18:25:50.837Z",
} as const satisfies Module
