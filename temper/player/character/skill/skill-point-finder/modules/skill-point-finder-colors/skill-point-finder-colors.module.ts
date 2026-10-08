import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointFinderColors = {
  id: "01a060ec-5834-7ce4-b990-b2f1dfab5f22",
  type: "page-type/module",
  slug: "skill-point-finder-colors",
  definition: "text colored by whether what that text names is done",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A color is written into the text as an inline markup tag.",
    },
  ],
  createdAt: "2026-09-02T07:01:36.948Z",
  updatedAt: "2026-09-21T15:46:08.000Z",
} as const satisfies Module
