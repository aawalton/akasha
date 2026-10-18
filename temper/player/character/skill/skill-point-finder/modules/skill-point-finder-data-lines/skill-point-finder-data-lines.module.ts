import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointFinderDataLines = {
  id: "01a060ec-5839-7f61-9ed3-8cffa9e93940",
  type: "page-type/module",
  slug: "skill-point-finder-data-lines",
  definition: "a row of the skill point window",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name sits at the left of its column and a count at the right, under its header.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A column header is set as the game's own list header is, in capitals.",
    },
  ],
  createdAt: "2026-09-02T07:01:36.953Z",
  updatedAt: "2026-10-18T23:45:59.702Z",
} as const satisfies Module
