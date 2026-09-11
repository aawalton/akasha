import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const housingBuildHouseTab = {
  id: "01a06128-d5c3-7317-b94a-8a7fbeb939ac",
  pageTypeSlug: "module",
  type: "module",
  slug: "housing-build-house-tab",
  definition: "building the controls of the house tab",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Controls are built once and hidden rather than made again.",
    },
  ],
} as const satisfies Module
