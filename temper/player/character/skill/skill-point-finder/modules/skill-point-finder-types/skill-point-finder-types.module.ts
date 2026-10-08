import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointFinderTypes = {
  id: "01a060ec-584d-78d8-941c-a8b43c987a6c",
  type: "page-type/module",
  slug: "skill-point-finder-types",
  definition: "the shapes the skill point window has while the game runs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
  createdAt: "2026-09-02T07:01:36.973Z",
  updatedAt: "2026-09-21T15:46:08.000Z",
} as const satisfies Module
