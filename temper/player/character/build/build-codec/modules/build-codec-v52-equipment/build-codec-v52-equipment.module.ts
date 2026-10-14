import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildCodecV52Equipment = {
  id: "01a062e7-4dd2-7284-adf4-5912e7c3808f",
  type: "page-type/module",
  slug: "build-codec-v52-equipment",
  definition: "update fifty-two's bit layout for a character's equipment",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each enchanted piece keeps its glyph's subtype, which says the glyph's level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subtype of zero is a piece whose glyph level is not known.",
    },
  ],
  createdAt: "2026-09-02T16:15:21.042Z",
  updatedAt: "2026-10-14T16:20:19.949Z",
} as const satisfies Module
