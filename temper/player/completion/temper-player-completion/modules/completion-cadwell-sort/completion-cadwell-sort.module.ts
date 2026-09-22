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
} as const satisfies Module
