import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const glyphHit = {
  id: "01a15f6d-8dd5-799a-bec0-169787e6d087",
  type: "page-type/module",
  slug: "glyph-hit",
  definition: "the damage a weapon glyph deals in one hit, from its tooltip",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A glyph's hit starts from the number its tooltip says it deals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Direct damage done to monsters multiplies the hit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The damage the target takes from the debuffs on it multiplies the hit apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hit is rounded once, at the end.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No target mitigation is taken, so a hit on a target that mitigates is unexplained.",
    },
  ],
  createdAt: "2026-10-21T17:06:17.684Z",
  updatedAt: "2026-10-21T17:06:17.684Z",
} as const satisfies Module
