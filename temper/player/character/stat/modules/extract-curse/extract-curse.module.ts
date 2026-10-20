import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const extractCurse = {
  id: "01a06271-abcf-7d81-aadf-ac14d2801969",
  type: "page-type/module",
  slug: "extract-curse",
  definition: "the curse a build carries, read out as an effect source",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A vampire stage reaches the stats only of a build that carries the vampire curse.",
    },
  ],
  createdAt: "2026-09-02T14:06:51.855Z",
  updatedAt: "2026-10-20T15:37:18.184Z",
} as const satisfies Module
