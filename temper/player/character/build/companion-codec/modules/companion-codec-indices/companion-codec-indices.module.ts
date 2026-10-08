import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionCodecIndices = {
  id: "01a062e7-4dd7-7d04-b984-162be3ad4db8",
  type: "page-type/module",
  slug: "companion-codec-indices",
  definition: "the small number each of a companion's game constants is packed as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every index is read from the pages at call time, in their build-hash places.",
    },
  ],
  createdAt: "2026-09-02T16:15:21.047Z",
  updatedAt: "2026-09-26T17:26:37.000Z",
} as const satisfies Module
