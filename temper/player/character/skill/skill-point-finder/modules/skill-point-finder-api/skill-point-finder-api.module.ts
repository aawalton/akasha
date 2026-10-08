import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointFinderApi = {
  id: "01a060ec-5830-7970-9982-411f52b14cd8",
  type: "page-type/module",
  slug: "skill-point-finder-api",
  definition: "the skill point window reachable by another add-on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The window is offered as one global object the game loads.",
    },
  ],
  createdAt: "2026-09-02T07:01:36.944Z",
  updatedAt: "2026-09-21T15:46:08.000Z",
} as const satisfies Module
