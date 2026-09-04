import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCadwellSort = {
  id: "01a06108-2feb-7a2d-9ef6-57df269ec508",
  pageTypeSlug: "module",
  slug: "completion-cadwell-sort",
  definition: "Cadwell's Almanac sorted into the order the game shows it in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Two entries sharing an order fall by their identifier.",
    },
  ],
} as const satisfies Module
