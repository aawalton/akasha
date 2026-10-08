import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCadwellSort = {
  id: "01a06108-2feb-7a2d-9ef6-57df269ec508",
  type: "page-type/module",
  slug: "completion-cadwell-sort",
  definition: "Cadwell's Almanac sorted into the game's own order",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Two entries sharing an order fall by their identifier.",
    },
  ],
  createdAt: "2026-09-02T07:32:01.643Z",
  updatedAt: "2026-09-22T13:46:31.000Z",
} as const satisfies Module
