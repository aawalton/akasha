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
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash before minor version ten is read with every rank page at its old place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank page's bit is read as its base page at the rank the hash or the table states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank the hash states is kept over the rank the table gives the page.",
    },
  ],
  createdAt: "2026-09-02T16:15:21.043Z",
  updatedAt: "2026-10-20T00:45:06.070Z",
} as const satisfies Module
