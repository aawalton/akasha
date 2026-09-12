import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const companionsFilterTypes = {
  id: "01a06421-2527-72cf-81cf-35554408ce56",
  type: "module",
  slug: "companions-filter-types",
  definition: "the shapes a companion filter takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A gear rule the shopping page narrows a query by is no companion filter.",
    },
  ],
} as const satisfies Module
