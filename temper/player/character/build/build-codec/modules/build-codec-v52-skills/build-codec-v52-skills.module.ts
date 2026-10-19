import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildCodecV52Skills = {
  id: "01a062e7-4dd3-79ae-be15-6dd7b2efcddd",
  type: "page-type/module",
  slug: "build-codec-v52-skills",
  definition: "update fifty-two's bit layout for a character's skills",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive is one bit saying whether it is purchased.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From minor version nine, four bits after those hold each purchased passive's rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ranks follow the order the purchased bits are in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank of zero states no rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash written before minor version nine states no rank for any passive.",
    },
  ],
  createdAt: "2026-09-02T16:15:21.043Z",
  updatedAt: "2026-10-19T23:34:53.871Z",
} as const satisfies Module
