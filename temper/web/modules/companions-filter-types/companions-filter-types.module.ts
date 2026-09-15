import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsFilterTypes = {
  id: "01a06421-2527-72cf-81cf-35554408ce56",
  type: "page-type/module",
  slug: "companions-filter-types",
  definition: "the shapes a companion filter takes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A gear rule the shopping page narrows a query by is no companion filter.",
    },
  ],
} as const satisfies Module
